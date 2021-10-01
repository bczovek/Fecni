let lists = [];

let categories = ["Élelmiszer", "Elektronika", "Stb", "Dohánytermék"];

function displayLists(){

    $('#lists').html('');

    for(let i=0; i<lists.length; i++){
        $('#lists').append(`<div class="col-sm-6">
        <div class="card" style="width: 18rem;">
            <div class="card-header">
            <div class="form-floating mb-3">
                <input type="text" class="form-control bg-light listname" id="name`+ i +`" value="`+lists[i].name+`">
                <label for="name`+ i +`">Bevásárlólista neve</label>
            </div>
                <button type="button" class="btn btn-danger remove" id="`+ i +`" style="font-weight: bolder;font-size: large;float:right">🗑</button>
                <button type="button" class="btn btn-success add" id="`+ i +`" style="font-weight: bolder;font-size: larger;float:right">+</button>
            </div>
            <div class="card-body" id="list`+ i +`">
            </div>
            <a href="#" id="map`+ i +`" class="btn btn-success mapButton">Térkép</a>
            <a href="#" id="save`+ i +`" class="btn btn-success saveButton">Mentés</a>
        </div>
    </div>`);

        for(let j = 0; j<lists[i].items.length; j++){
            $('#list'+i).append(`<div class="card bg-success text-light" style="width: 15rem;">
            <div class="card-body">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control bg-success text-light itemname" id="name`+ i +`-`+ j +`" value="`+lists[i].items[j].name+`">
                    <label for="name`+ i +`-`+ j +`">Termék neve</label>
                  </div>
                <select class="form-select" aria-label="Default select example" id="`+ i +`-`+ j +`" style="width: 8rem;float:left">
                </select>
                <button type="button" class="btn btn-danger removeItem" id="`+ i +`-`+ j +`" style="font-weight: bolder;font-size: large;float:right">🗑</button>
                </div>
            </div>`);

            for(let k=0; k<categories.length; k++){
                $('#'+i+'-'+j).append('<option value="'+ k +'" >'+ categories[k] +'</option>');
            }

            $('#'+i+'-'+j+' option[value='+ lists[i].items[j].category +']').attr('selected', 'selected');
        }
    }
}

function newList(){
    lists.push({
        name: "",
        items: []
    });

    displayLists();
}

$(document).on('change', 'select', function(){
    
    let i = parseInt(this.id.split('-')[0]);
    let j = parseInt(this.id.split('-')[1]);

    lists[i].items[j].category = this.value;
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
    let id = this.id;

    lists[id].items.push({
        name: "",
        category: 0
    });

    displayLists();
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
})