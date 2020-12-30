function deleteBlogPost(title){
    $.ajax({ url : `/delete/${title}`, method : 'delete', data : {} })
}

function updateBlogPost (title) {
    $.ajax({ 
        url : `/update/${title}`,
        method : 'put', 
        data : {
            'title': $(`#title-${title}`).val(),
            'author': $(`#author-${title}`).val(),
            'email' : $(`#email-${title}`).val(),
            'content': $(`#content-${title}`).val(),
            'category': $(`#category-${title}`).val(),
            'dateupload': $(`#dateupload-${title}`).val()
        } 
    })
}

function moveItemUp(title){
    $.ajax({
        url: `/up/${title}`,
        method: 'get',
        data: {}
    })
}

function moveItemDown(title){
    $.ajax({
        url: `/down/${title}`,
        method: 'get',
        data:{}
    })
}


$(()=>{

    let btn = $('#btn')
    let bloglist = $('#bloglist')

    function refreshBlog(){
        bloglist.empty()
        $.get('/site?mode=json', (data)=>{
            console.log(data)
            for(let blog of data){
                if(blog)
                    bloglist.append(
                        `<li class="list-group-item list-group-item-warning">
                            <form id='editform' style="display:none;">
                                <label>Edit : ${blog.title} </label><br><br>

                                <input type='hidden' class="form-control" name='ssr' value="n"/>
                                <label> Title </label>
                                <input type="text" style="width: 30%;" class="form-control" id="title-${blog.title}" required placeholder="Enter Name">
                                <br>

                                <label>Choose a Category:</label> 
                                <select style="width: 30%;" class="form-control" id="category-${blog.title}" required>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="technology">Technology</option>
                                    <option value="dsa">DSA</option>
                                    <option value="web">Web</option>
                                    <option value="android">Android</option>
                                </select>
                                <br>
                                
                                <label>Email</label>
                                <input type='email' style="width: 30%;" class="form-control" required id='email-${blog.title}' placeholder="Enter Your Email">
                                <br>

                                <label> Author </label>
                                <input type='text' style="width: 30%;" class="form-control" required id='author-${blog.title}' placeholder="Enter author name">
                                <br>
                                
                                <label>Content</label>
                                <p><textarea style="width: 40%;" required id='content-${blog.title}'rows="7" cols="70" placeholder="Enter your views...."></textarea></p> 

                                <label>Date of Upload</label>
                                <input type='date' style="width: 30%;" class="form-control" required id='dateupload-${blog.title}'> <br> <br>

                                <button type='submit' class="btn btn-primary" onclick="updateBlogPost('${blog.title}')"> Update </button>

                            </form>
                            <br>
                            <button class="btn btn-primary" onclick='document.getElementById("editform").style.display="block";'>Edit</button>
                            &nbsp;
                            <button class="btn btn-danger" onclick="deleteBlogPost('${blog.title}'); location.reload();"> Delete </button>
                            &nbsp;
                            <button class="btn btn-info" onclick="moveItemUp('${blog.title}'); location.reload();"> Up </button>
                            &nbsp;
                            <button class="btn btn-warning" onclick="moveItemDown('${blog.title}'); location.reload();"> Down </button>
                            <br><br>
                                TITLE: ${blog.title} <br>
                                CATEGORY: ${blog.category} <br> 
                                EMAIL: ${blog.email} <br>
                                AUTHOR: ${blog.author} <br>
                                CONTENT: ${blog.content} <br>
                                UPLOAD DATE: ${blog.dateupload} <br>
                                <br>
                        </li> <br>`
                    )
            }
        })
    }
    refreshBlog()

    btn.click((ev) => {
        $.post(
            '/add',
            {
                title: $('#title').val(),
                category: $('#category').val(),
                email: $('#email').val(),
                author: $('#author').val(),
                content: $('#content').val(),
                dateupload: $('#dateupload').val(),
            },
            (data)=>{
                refreshBlog()
            }
        )
    })
})