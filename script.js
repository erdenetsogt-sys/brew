const threadSectionDOM = document.querySelector(".thread-section");
const formDOM = document.querySelector(".form-section");
const inputTextDOM = document.getElementById("inputTitle");
const inputContextDOM = document.getElementById("inputContent");
let inputText = "";
let inputContext  = "";

const getAllThreads = async () => {
try {
    let allThreads = await axios.get("/api/v1/threads");
    
    let { data } = allThreads;

    allThreads = data
    .map((thread) => {
        const { title, content} = thread;
        return `
        <div class="single-thread">
        <h3>${title}</h3>
        <p>${content}</p>
        </div>
        `
    }).join(" ");
    threadSectionDOM.innerHTML = allThreads;
} catch (err) {
    console.log(err);
}
};

getAllThreads();

inputTextDOM.addEventListener("change", (e) => {
    inputText = e.target.value;
});
inputContextDOM.addEventListener("change", (e) => {
    inputContext = e.target.value;
});

formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (inputText &&  inputContext){
        try {
            await axios.post("/api/v1/thread", {
                title: inputText, 
                content: inputContext
            });
            getAllThreads();
        } catch (err) {
            console.log(err);
        }
        inputText = "";
        contentText = "";
        inputTextDOM.value = "";
        inputContextDOM.value = "";

    }else{
        console.log("error");
    }

})

