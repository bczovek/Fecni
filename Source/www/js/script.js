let lists = [];

let categories = [{
    name: "Élelmiszer",
    type: "grocery"
},
{
    name: "Pékáru",
    type: "bakery"
},
{
    name: "Elektronika",
    type: "electronics_store"
},
{
    name: "Szeszes ital",
    type: "liquor_store"
},
{
    name: "Gyógyszer",
    type: "pharmacy"
},
{
    name: "Ruha",
    type: "clothing_store"
},
{
    name: "Cipő",
    type: "shoe_store"
},
{
    name: "Könyv",
    type: "book_store"
},
{
    name: "Háztartási cikk",
    type: "home_goods_store"
},
{
    name: "Drogéria és Illatszer",
    type: "drugstore"
},
{
    name: "Virág és Szobanövény",
    type: "florist"
},
{
    name: "Bútor",
    type: "furniture_store"
},
{
    name: "Ékszer",
    type: "jewelry_store"
}
];

function displayLists(){

    $('#lists').html('');

    for(let i=0; i<lists.length; i++){
        $('#lists').append(`<div class="col-sm-6">
        <div class="card" style="width: 18rem; margin-bottom:2%">
            <div class="card-header">
            <div class="form-floating mb-3">
                <input type="text" placeholder="Bevásárlólista neve" class="form-control bg-light listname" id="name`+ i +`" value="`+lists[i].name+`">
                <label for="name`+ i +`">Bevásárlólista neve</label>
            </div>
                <button type="button" class="btn btn-danger remove" id="`+ i +`" style="font-weight: bolder;font-size: large;float:right; text-align: center; margin: 3px; width: 50px; height: 40px;">🗑</button>
                <button type="button" class="btn btn-success add" id="`+ i +`" style="font-weight: bolder;font-size: larger;float:right; text-align: center; margin: 3px; height: 40px; width: 50px;">+</button>
            </div>
            <div class="card-body" id="list`+ i +`">
            </div>
            <a href="#map" id="map`+ i +`" class="btn btn-success mapButton" style="padding: 5px; margin: 5px;">Megjelenítés térképen</a>
        </div>
    </div>`);

        for(let j = 0; j<lists[i].items.length; j++){
            $('#list'+i).append(`<div class="card bg-success text-light" style="width: 15rem;">
            <div class="card-body">
                <div class="form-floating mb-3">
                    <input type="text" placeholder="Termék neve" class="form-control bg-success text-light itemname" id="name`+ i +`-`+ j +`" value="`+lists[i].items[j].name+`">
                    <label for="name`+ i +`-`+ j +`">Termék neve</label>
                  </div>
                <select class="form-select" aria-label="Default select example" id="`+ i +`-`+ j +`" style="width: 8rem;float:left">
                </select>
                <button type="button" class="btn btn-danger removeItem" id="`+ i +`-`+ j +`" style="font-weight: bolder;font-size: large;float:right">🗑</button>
                </div>
            </div>`);

            for(let k=0; k<categories.length; k++){
                $('#'+i+'-'+j).append('<option value="'+ categories[k].type +'" >'+ categories[k].name +'</option>');
            }

            $('#'+i+'-'+j+' option[value='+ lists[i].items[j].type +']').attr('selected', 'selected');
        }
    }
}

function newList(){

    if(lists.length < 6){
        lists.push({
            name: "",
            items: []
        });

    displayLists();
    } else {
        alert("Elérte a bevásárlólisták számának maximumát!");
    }
}

$(document).on('change', 'select', function(){
    
    let i = parseInt(this.id.split('-')[0]);
    let j = parseInt(this.id.split('-')[1]);

    lists[i].items[j].type = this.value;
})

$(document).on('change', '.listname', function(){
    
    let i = parseInt(this.id.slice(-1));
    lists[i].name = this.value;
})

$(document).on('change', '.itemname', function(){
    
    let id = this.id.slice(-3);
    let i = id.split('-')[0];
    let j = id.split('-')[1];

    lists[i].items[j].name = this.value;
})

$(document).on('click', '.add', function(){
    let i = this.id;

    if(lists[i].items.length < 16){
        lists[i].items.push({
            name: "",
            type: "supermarket"
        });

        displayLists();
    } else {
        alert(`Elérte a tételek számának maximumát ezen a listán: ${lists[i].name}`);
    }
});

$(document).on('click', '.remove', function(){
    let id = this.id;

    lists.splice(id,1);

    displayLists();
});

$(document).on('click', '.removeItem', function(){

    let i = parseInt(this.id.split('-')[0]);
    let j = parseInt(this.id.split('-')[1]);

    lists[i].items.splice(j,1);

    displayLists();
});

$(document).on('click', '.mapButton', function(){

    const i = parseInt(this.id.slice(-1));
    if(lists.name !== "" && lists[i].items.every(e => e.name !== "")){
        const types = getTypes(lists[i].items.map(e => e.type));
        const range = $('#mapRange').val();
        const openNow = $('#openNow').is(":checked");

        searchShops(types,range,openNow);
    } else {
        alert("A megjelenítéshez adjon meg nevet a listának és minden elemének!");
    }
});

function getTypes(types){

    let result = [];

    types.forEach(element => {
        if(!result.includes(element)){
            result.push(element);
        }
    });

    return result;
}