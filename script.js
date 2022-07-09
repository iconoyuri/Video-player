vidElement = document.getElementById("video-element")
let current = null
let isPlaying = false 
let mouseInside = false

let pauseVideo = () => {
    vidElement.pause()
    isPlaying = false 
    current.classList.add("paused")
    current.dataset.status = "stand-by"
}
let playVideo = () => {
    vidElement.play()
    isPlaying = true 
    current.classList.remove("paused")
    current.dataset.status = "playing"
}
let setVideo = (thumbBlock) => {
    let img = thumbBlock.querySelector("img")
    Array.from(thumbBlock.parentNode.children).forEach(e => {
        e.dataset.status="stand-by"
        e.classList.remove("active")
        e.classList.add("paused")
    })
    vidElement.src = img.dataset.vidSrc
    // vidElement.poster = img.src
    thumbBlock.classList.add("active")
    current = thumbBlock
}
document.querySelectorAll(".thumbnail").forEach(element => {
    element.addEventListener("click", function(e){
        if(this.dataset.status != "playing"){
            setVideo(this)
            playVideo()
        } else{
            pauseVideo()
        }
    })
});
vidElement.addEventListener("ended", function(){
    current.dataset.status = "stand-by"
    current.classList.remove("active")
    current.classList.add("paused")
    document.querySelector('.showcase').classList.remove('hidden')
    mouseInside = true
})
vidElement.addEventListener("play", function(){
    playVideo()
})
vidElement.addEventListener("pause", function(){
    // isPlaying = false
    pauseVideo()
})
let hideShowcase = () => {
    mouseInside = false
    setTimeout(() => {
        if(!mouseInside && vidElement.src != "" && isPlaying){
            document.querySelector('.showcase').classList.add('hidden')
        } 
    }, 3000)
}
document.querySelector(".showcase").addEventListener("mouseenter", () => mouseInside = true)
document.querySelector(".showcase").addEventListener("mouseleave", hideShowcase)
