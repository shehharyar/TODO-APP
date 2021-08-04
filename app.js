var list = document.getElementById("list")
firebase.database().ref('todos').on('child_added', function(data) {

    var li = document.createElement("li")
    var list_text = document.createTextNode(data.val().value);
    li.appendChild(list_text)


    var del_btn = document.createElement("button")
    var btn_txt = document.createTextNode("DELETE")
    del_btn.setAttribute("class", "del2")
    del_btn.setAttribute("id", data.val().key);
    del_btn.setAttribute("onclick", "delete_item(this)")

    del_btn.appendChild(btn_txt)
    li.appendChild(del_btn)


    var edit_btn = document.createElement("button")
    var edit_txt = document.createTextNode("EDIT")
    edit_btn.setAttribute("class", "edit")
    edit_btn.setAttribute("onclick", "edit_item(this)")
    edit_btn.setAttribute("id", data.val().key)
    edit_btn.appendChild(edit_txt)
    li.appendChild(edit_btn)


    list.appendChild(li)

})

function Addtodo() {
    var a_item = document.getElementById("ad-item")



    var key = firebase.database().ref('todos').push().key;
    var todo = {
        value: a_item.value,
        key: key
    };
    firebase.database().ref('todos').child(key).set(todo);

    localStorage.setItem(JSON.stringify(todo.key), JSON.stringify(todo.value));
    a_item.value = ""
}

function delete_item(c) {
    firebase.database().ref('todos').child(c.id).remove();
    c.parentNode.remove();
}

function delete_All() {
    firebase.database().ref('todos').remove();
    list.innerHTML = ""



}

function edit_item(e) {
    var edit_value = prompt("Enter updated value", e.parentNode.firstChild.nodeValue);

    var todoItem = {
        value: edit_value,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(todoItem);
    e.parentNode.firstChild.nodeValue = edit_value;

}