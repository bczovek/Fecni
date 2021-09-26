let lists = [];

let categories = ["Élelmiszer", "Elektronika", "Stb", "Dohánytermék"];

function displayLists(){

    $('#lists').html('');

    for(let i=0; i<lists.length; i++){
        $('#lists').append(`<div class="col-sm-6">
        <div class="card" style="width: 18rem;">
            <div class="card-header">
                `+ lists[i].name +`
                <button type="button" class="btn btn-danger remove" id="`+ i +`" style="font-weight: bolder;font-size: large;float:right">🗑</button>
                <button type="button" class="btn btn-success add" id="`+ i +`" style="font-weight: bolder;font-size: larger;float:right">+</button>
            </div>
            <div class="card-body" id="list`+ i +`">
            </div>
        </div>
    </div>`);

        for(let j = 0; j<lists[i].items.length; j++){
            $('#list'+i).append(`<div class="card bg-success text-light" style="width: 15rem;">
            <div class="card-body">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control bg-success text-light" id="floatingInput" placeholder="Új tárgy">
                    <label for="floatingInput">Név</label>
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
        name: "Bevásárlólista",
        items: []
    });

    displayLists();
}

$(document).on('change', 'select', function(){
    
    let i = parseInt(this.id.split('-')[0]);
    let j = parseInt(this.id.split('-')[1]);

    lists[i].items[j].category = this.value;
})

$(document).on('click', '.add', function(){
    let id = this.id;

    lists[id].items.push({
        name: "Új tárgy",
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