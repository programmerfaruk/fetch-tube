document.getElementById('blog-btn').addEventListener('click', ()=>{
    location.href = "blog.html"
});

function goHome(){
    location.href = "index.html";
};

const loadDate = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const loaddedData = data.data;
    console.log('loadded Data', loaddedData);
    displayCategory(loaddedData)
}

function displayCategory(categories) {
    const categoryContainer = document.getElementById('catagory-section');
    for (category of categories) {
        // console.log('single category', category.category_id);
        const createCategory = document.createElement('button');
        createCategory.innerHTML = `
        <button class="btn btn-primary" onclick="getCategory('${category.category_id}')">${category.category}</button>
       `
        categoryContainer.appendChild(createCategory)
        // console.log('2nd test single catogary', category.category_id);
    }
}

async function loadVideo(selectCategory = 1000) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${selectCategory}`);
    console.log('getlink', res.url);
    const data = await res.json();
    const videos = data.data;
    const videoContainer = document.getElementById('video-section');
    videoContainer.innerHTML = ' ';
    console.log("chack status", data);
    if (data.status === true) {
        videos?.forEach(video => {
            console.log(video);
            const createVideo = document.createElement('div');
            createVideo.innerHTML = `
             <div class="card bg-base-100 shadow-xl">
                <figure><img class="h-48" src="${video?.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body">
              <h2 class="card-title"><span><img class="w-[40px] rounded-full" src="${video.authors[0].profile_picture}"></span> ${video?.title}</h2>

              <p>${video.authors[0].profile_name}<span class="text-red-400">${video.authors[0].verified ? `<img class="inline mx-3" src="images/tik.svg">` : ' '}</span></p>
              <p>${video?.others?.views} Views</p>
                </div>
                </div>
            `
            videoContainer.appendChild(createVideo);
        });
    }else{
        const noVideo = `<div class="col-span-4 mx-auto">
            <img class="mx-auto" src="images/Icon.png" alt="" srcset="">
            <h2 class="text-3xl text-center font-bold">Oops!! Sorry, There is no <br>content here</h2>
             </div>`
             videoContainer.innerHTML = noVideo;
    }

}


function getCategory(selectCategory) {
    loadVideo(selectCategory);
}

loadDate()
loadVideo();


const copyrightSymbol = "\u00A9";
const yearYear = new Date().getFullYear();
const copyRight = document.getElementById('copyright')
copyRight.innerText = `copyright ${copyrightSymbol} ${yearYear}`