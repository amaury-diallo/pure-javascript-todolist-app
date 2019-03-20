document.addEventListener('DOMContentLoaded', function() {
    
    var btnAddNewTask = document.querySelector('#add-new-task'),
        inputField = document.querySelector('#new-task-name'),
        list = document.querySelector('.list')

    // Add new task
    function addNewTask () {
        // Recuperation de l'intitule de la nouvelle tache
        var newTaskName = (inputField.value).trim()
        inputField.value = ''
        btnAddNewTask.classList.add('disabled')
        var newTaskTemplate =   '<li class="task hidden">\
                                                <input type="checkbox" class="task-state filled-in"/>\
                                                <span class="task-name">'+ newTaskName +'</span>\
                                                <span class="remove-task right"><i class="material-icons right waves-effect waves-red remove-icon">delete</i></span>\
                                            </li>'

        list.innerHTML += newTaskTemplate

        var newTask = list.lastChild
        setTimeout( function () {
            newTask.classList.remove('hidden')
        }, 300)

        taskCounter = document.querySelector('.todo-tasks')
        taskCounter.innerHTML = list.childElementCount

        TaskRemoveHandler () 
    }

    // Mise a jour du nombre de taches accomplies
    function updateDoneTasks () {
        var doneTasks = document.querySelectorAll('.list .task.is-done:not(.hidden)'),
            doneTaskCounter = document.querySelector('.done-tasks')
        doneTaskCounter.innerHTML = doneTasks.length
    }

    // Mise a jour du nombre de taches
    function updateTaskCounter () {
        var list = document.querySelector('.list'),
        taskCounter = document.querySelector('.todo-tasks')
        taskCounter.innerHTML = list.childElementCount - 1
    }

    // Gestion du bouton d'ajout
    inputField.addEventListener('keyup', function(event) {
        // Recuperation de l'intitule de la nouvelle tache
        var newTaskName = (inputField.value).trim()
        // Si aucun nom n'est fourni, 
        if (newTaskName.length === 0) {
            // Désactiver le bouton d'ajout
            btnAddNewTask.classList.add('disabled')
        }
        else { //Sinon
            // Activer le bouton d'ajout
            btnAddNewTask.classList.remove('disabled')  
            // Ajouter la tache si la touche [ENTRER] est pressée
            if (event.key == "Enter") {
                addNewTask()
            }
        }
    })

    // Gestion du bouton d'ajout (click)
    btnAddNewTask.addEventListener('click', addNewTask)

    // Changer l'etat(terminee ou non) d'une tache
    list.addEventListener('click', function(e) {
        var task = null
        if (e.target.classList.contains('task')) {
            task = e.target;
        }
        else if (e.target.classList.contains('task-name')){
            task = e.target.parentNode
        }

        if (task) {
            task.classList.toggle('is-done')
            var taskState = task.children[0]
            taskState.classList.toggle('checked')
        }

        updateDoneTasks()
    })

    // Gestion de la suppression
    function TaskRemoveHandler () {
        var removeIcons = document.querySelectorAll('.remove-task .remove-icon')

        for (var i = removeIcons.length - 1; i >= 0; i--) {
            removeIcons[i].addEventListener('click', function (e) {
                var task = e.target.parentNode.parentNode
                task.classList.add('hidden')
                setTimeout( function () {
                    task.remove()
                }, 300)

                updateTaskCounter()
            }, )
        }
    }
})