const userLists = [];
const userSharedLists = [];

const categories = [{
    name: "Élelmiszer",
    type: "supermarket"
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

function displayLists(lists){

    $('#lists').html('');

    if(lists.length > 0){
        drawLists(lists);
    } else {
        $('#lists').append(`<h4>Jelenleg nincs bevásárlólistája!</h4>`);
    }
    
}

function drawLists(lists){
    for(let i=0; i<lists.length; i++){
        $('#lists').append(`<div class="col-sm-6">
        <div class="card" style="width: 18rem; margin-bottom:2%">
            <div class="card-header">
                <input type="text" placeholder="Bevásárlólista neve" class="form-control bg-light listname" id="name`+ i +`" value="`+lists[i].name+`">
                <button type="button" class="btn btn-danger remove" id="`+ i +`" style="font-weight: bolder;font-size: large;float:right; text-align: center; margin: 3px; width: 50px; height: 40px;">🗑</button>
                <button type="button" class="btn btn-success add" id="`+ i +`" style="font-weight: bolder;font-size: larger;float:right; text-align: center; margin: 3px; height: 40px; width: 50px;">+</button>
            </div>
            <div class="card-body" id="list`+ i +`">
            </div>
            <button type="button" class="btn btn-success saveButton" id="save`+ i +`" style="padding: 5px; margin: 5px;">Mentés</button>
            <button type="button" id="share`+ i +`" class="btn btn-success shareButton" style="padding: 5px; margin: 5px;">
                Megosztás
            </button>
            <a href="#map" id="map`+ i +`" class="btn btn-success mapButton" style="padding: 5px; margin: 5px;">Megjelenítés térképen</a>
        </div>
    </div>`);

        for(let j = 0; j<lists[i].items.length; j++){
            $('#list'+i).append(`<div class="card bg-success text-light" style="width: 15rem;">
            <div class="card-body">
                <input type="text" placeholder="Termék neve" class="form-control itemname" id="name`+ i +`-`+ j +`" value="`+lists[i].items[j].name+`" style="margin-bottom: 5px">
                <select class="form-select listselect" aria-label="Default select example" id="`+ i +`-`+ j +`" style="width: 8rem;float:left">
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

function displaySharedLists(lists){

    $('#sharedlists').html('');

    if(lists.length > 0){
        drawSharedLists(lists);
    } else {
        $('#sharedlists').append(`<h4>Jelenleg nincs megosztott bevásárlólistája!</h4>`);
    }
    
}

function drawSharedLists(lists){
    for(let i=0; i<lists.length; i++){
        const owners = lists[i].owners ? lists[i].owners : "";
        $('#sharedlists').append(`<div class="col-sm-6">
        <div class="card" style="width: 18rem; margin-bottom:2%">
            <div class="card-header">
                <input type="text" placeholder="Bevásárlólista neve" class="form-control bg-light sharedlistname" id="name`+ i +`" value="`+lists[i].name+`">
                <button type="button" class="btn btn-danger sharedremove" id="`+ i +`" style="font-weight: bolder;font-size: large;float:right; text-align: center; margin: 3px; width: 50px; height: 40px;">🗑</button>
                <button type="button" class="btn btn-success sharedlistadd" id="`+ i +`" style="font-weight: bolder;font-size: larger;float:right; text-align: center; margin: 3px; height: 40px; width: 50px;">+</button>
            </div>
            <div class="card-body" id="sharedlist`+ i +`">
            </div>
            <button type="button" class="btn btn-success sharedSaveButton" id="sharedSave`+ i +`" style="padding: 5px; margin: 5px;">Módosítás</button>
            <span style="padding: 5px; margin: 5px; text-align: center;">Megosztva: `+ owners +`</span>
            <a href="#map" id="map`+ i +`" class="btn btn-success sharedmapButton" style="padding: 5px; margin: 5px;">Megjelenítés térképen</a>
        </div>
    </div>`);

        for(let j = 0; j<lists[i].items.length; j++){
            $('#sharedlist'+i).append(`<div class="card bg-success text-light" style="width: 15rem;">
            <div class="card-body">
                <input type="text" placeholder="Termék neve" class="form-control shareditemname" id="name`+ i +`-`+ j +`" value="`+lists[i].items[j].name+`" style="margin-bottom: 5px">
                <select class="form-select sharedlistselect" aria-label="Default select example" id="shared`+ i +`-`+ j +`" style="width: 8rem;float:left">
                </select>
                <button type="button" class="btn btn-danger sharedremoveItem" id="shared`+ i +`-`+ j +`" style="font-weight: bolder;font-size: large;float:right">🗑</button>
                </div>
            </div>`);

            for(let k=0; k<categories.length; k++){
                $('#shared'+i+'-'+j).append('<option value="'+ categories[k].type +'" >'+ categories[k].name +'</option>');
            }

            $('#shared'+i+'-'+j+' option[value='+ lists[i].items[j].type +']').attr('selected', 'selected');
        }
    }
}

function newList(){

    if(userLists.length < 6){
        userLists.push({
            name: "",
            items: [],
            uid: uid()
        });

    displayLists(userLists);
    } else {
        alert("Elérte a bevásárlólisták számának maximumát!");
    }
}

function removeList(index){
        $.ajax({
            url: window.location.origin + "/removelist",
            type: "DELETE",
            contentType: "application/json",
            data: JSON.stringify({
                uid: userLists[index].uid
            }),
            success: function(data){
                console.log(data);
                userLists.splice(index,1);
                displayLists(userLists);
            },
            error: function(error){
                alert(error.responseText);
            }
        });
}

$(document).on('click', ".saveButton", function(){
    const i = parseInt(this.id.slice(-1));

    save(i);
});

$(document).on('click', ".sharedSaveButton", function(){
    const i = parseInt(this.id.slice(-1));

    sharedSave(i);
});

$(document).on('change', '.listselect', function(){
    
    const i = parseInt(this.id.split('-')[0]);
    const j = parseInt(this.id.split('-')[1]);
    console.log(i+" "+j);
    userLists[i].items[j].type = this.value;
})

$(document).on('change', '.listname', function(){
    
    const i = parseInt(this.id.slice(-1));
    userLists[i].name = this.value;
})

$(document).on('change', '.itemname', function(){
    
    const id = this.id.slice(-3);
    const i = id.split('-')[0];
    const j = id.split('-')[1];

    userLists[i].items[j].name = this.value;
})

$(document).on('click', '.add', function(){
    const i = this.id;

    if(userLists[i].items.length < 16){
        userLists[i].items.push({
            name: "",
            type: "supermarket"
        });

        displayLists(userLists);
    } else {
        alert(`Elérte a tételek számának maximumát ezen a listán: ${userLists[i].name}`);
    }
});

$(document).on('click', '.remove', function(){
    const id = this.id;

    if(confirm("Biztosan törölni akarja ezt a listát?")){
        removeList(id);
    }
});

$(document).on('click', '.removeItem', function(){

    const i = parseInt(this.id.split('-')[0]);
    const j = parseInt(this.id.split('-')[1]);

    userLists[i].items.splice(j,1);

    displayLists(userLists);
});

$(document).on('click', '.mapButton', function(){

    const i = parseInt(this.id.slice(-1));
    if(userLists[i].name !== "" && userLists[i].items.every(e => e.name !== "")){
        const types = getTypes(userLists[i].items.map(e => e.type));
        const range = $('#mapRange').val();
        const openNow = $('#openNow').is(":checked");

        searchShops(types,range,openNow);
    } else {
        alert("A megjelenítéshez adjon meg nevet a listáknak és minden elemének!");
    }
});

function getTypes(types){

    const result = [];

    types.forEach(element => {
        if(!result.includes(element)){
            result.push(element);
        }
    });

    return result;
}

function saveAll(){
    for(let i=0; i < userLists.length; i++){
        save(i);
    }
}

function save(index){

    console.log(userLists);
 
    if(userLists[index].name !== "" && userLists[index].items.every(e => e.name !== "")){
        $.ajax({
            url: window.location.origin + "/save",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: userLists[index]
            }),
            success: function(data){
                console.log(data);
            },
            error: function(error){
                alert(error.responseText);
            }
        });
    } else {
        alert("Adjon nevet a listának és minden elemének a mentéshez");
    }

}

function sharedSave(index){

    if(userSharedLists[index].name !== "" && userSharedLists[index].items.every(e => e.name !== "")){
        $.ajax({
            url: window.location.origin + "/sharedsave",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: userSharedLists[index]
            }),
            success: function(data){
                console.log(data);
            },
            error: function(error){
                alert(error.responseText);
            }
        });
    } else {
        alert("Adjon nevet a listának és minden elemének a mentéshez");
    }

}

$(document).ready(() => {

    $.ajax({
        url: window.location.origin + "/lists",
        type: "GET",
        success: function(data){
            userLists.push(...data);
            displayLists(userLists);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });

});

$(document).ready(() => {

    $.ajax({
        url: window.location.origin + "/sharedlists",
        type: "GET",
        success: function(data){
            userSharedLists.push(...data);
            displaySharedLists(userSharedLists);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });

});