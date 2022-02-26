const comments_url = "https://jsonplaceholder.typicode.com/comments";
const initialButton = document.querySelector("#initialButton");
const loadingButton = document.querySelector("#loadingButton");
const comments = document.querySelector(".comments")

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

function somethingWentWrong(error){
    comments.innerHTML = 
                        `<div class="something-went-wrong">
                            Что-то пошло не так<br>
                            <span class="error">${error}</span>
                        </div>`;
}

function createComment(postId, id, name, email, body, last=false){
    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = `<div class="person-info">
                            <div class="profile">
                                <div class="profile-name">
                                    ${name}
                                </div>
                                <div class="profile-id">
                                    #${id}
                                </div>
                            </div>
                            <div class="email">
                                ${email}
                            </div>
                        </div>
                        <div class="content">
                            ${body}
                        </div>
                        <div class="post-id">
                            <span>Commented to post</span>
                            <a href="#fakelink">${postId}</a>
                        </div>`;
    if(last){
        comment.classList.toggle("end-comment");
    }
    return comment;
}

async function loadComments(){
    comments.innerHTML = "";

    await waitFor(getRandomInt(10, 31) * 100);

    // try {
    //     const response = await fetch(comments_url).then((response) => response.json()).catch((err) => {
    //         somethingWentWrong(err.status);
    //         changeButtons();
    //     });
    // } catch (error) {
    //     somethingWentWrong("Unknown")
    //     return;
    // }

    const response = await fetch(comments_url).then((response) => response.json()).catch((err) => {
        somethingWentWrong(err.status);
        changeButtons();
    });

    for(var i = 0; i < response.length - 1; i++){
        if(Math.random() < 0.95) continue; // отсекаемые комменты, меньше значение - больше комментов

        comments.appendChild(createComment(response[i]["postId"], 
                                           response[i]["id"],
                                           response[i]["name"],
                                           response[i]["email"],
                                           response[i]["body"]));
    }
    comments.appendChild(createComment(response[i]["postId"], 
                                       response[i]["id"],
                                       response[i]["name"],
                                       response[i]["email"],
                                       response[i]["body"],
                                       true));
}

function changeButtons(){
    initialButton.classList.toggle("hidden");
    loadingButton.classList.toggle("hidden");
}

initialButton.addEventListener("click", async function(event){
    changeButtons()
    await loadComments()
    changeButtons()
});