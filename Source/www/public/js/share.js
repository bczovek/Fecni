let listToShare = null;

$(document).on('click', '.shareButton', function(){

    listToShare = parseInt(this.id.slice(-1));
    $('#shareModal').modal('show');
});

$(document).on('click', '.close', function(){
    console.log("click");
    $('#shareModal').modal('hide');
});

$(document).on('click', '#modalShare', function(){
    
    const id = $('#shareTo').val();
    $('#shareModal').modal('hide');

    shareList(id);
});

function shareList(id){

    $.ajax({
        url: window.location.origin + "/share",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            list: userLists[listToShare],
            shareTo: id,
            uid: uid()
            }),
        success: function(data){
            console.log(data);
            userSharedLists.push(userLists[listToShare]);
            removeList(listToShare);
            displaySharedLists(userSharedLists);
        },
        error: function(error){
            alert(error.responseText);
        }
    });

}

function uid(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

$(document).on('change', '.sharedlistselect', function(){
    
    const i = parseInt(this.id.split('-')[0].slice(-1));
    const j = parseInt(this.id.split('-')[1]);
    console.log(i+" "+j);
    userSharedLists[i].items[j].type = this.value;
    console.log(userSharedLists[i].items[j].type);
});

$(document).on('change', '.sharedlistname', function(){
    
    const i = parseInt(this.id.slice(-1));
    userSharedLists[i].name = this.value;
    console.log(userSharedLists[i].name);
});

$(document).on('change', '.shareditemname', function(){
    
    const id = this.id.slice(-3);
    const i = id.split('-')[0];
    const j = id.split('-')[1];

    userSharedLists[i].items[j].name = this.value;
    console.log(userSharedLists[i].items[j].name);
})

$(document).on('click', '.sharedlistadd', function(){
    const i = this.id;

    if(userSharedLists[i].items.length < 16){
        userSharedLists[i].items.push({
            name: "",
            type: "supermarket"
        });

        displaySharedLists(userSharedLists);
    } else {
        alert(`Elérte a tételek számának maximumát ezen a listán: ${userSharedLists[i].name}`);
    }
});

$(document).on('click', '.sharedremove', function(){
    const id = this.id;

    if(confirm("Biztosan törölni akarja ezt a listát?")){
    removeSharedList(id);
    }
});

$(document).on('click', '.sharedremoveItem', function(){

    const i = parseInt(this.id.split('-')[0].slice(-1));
    const j = parseInt(this.id.split('-')[1]);

    userSharedLists[i].items.splice(j,1);

    displaySharedLists(userSharedLists);
});

function removeSharedList(index){
    
        $.ajax({
            url: window.location.origin + "/removesharedlist",
            type: "DELETE",
            contentType: "application/json",
            data: JSON.stringify({
                uid: userSharedLists[index].uid
            }),
            success: function(data){
                console.log(data);
                userSharedLists.splice(index,1);
                displaySharedLists(userSharedLists);
            },
            error: function(error){
                alert(error.responseText);
            }
        });
}

$(document).on('click', '.sharedmapButton', function(){

    const i = parseInt(this.id.slice(-1));
    if(userSharedLists[i].name !== "" && userSharedLists[i].items.every(e => e.name !== "")){
        const types = getTypes(userSharedLists[i].items.map(e => e.type));
        const range = $('#mapRange').val();
        const openNow = $('#openNow').is(":checked");

        searchShops(types,range,openNow);
    } else {
        alert("A megjelenítéshez adjon meg nevet a listáknak és minden elemének!");
    }
});