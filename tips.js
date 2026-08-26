const tips = [

{
title:"👨‍🎓 Student Safety",

images:[
"Student1.jpeg",
"Student2.jpeg",
"Student3.jpeg",
"Student4.jpeg",
"Student5.jpeg"
],

points:[
"Never share your OTP or Password.",
"Use strong passwords for all accounts.",
"Avoid clicking unknown links.",
"Keep your laptop and mobile updated.",
"Report suspicious messages immediately."
]
},

{
title:"👩‍🏫 Faculty Safety",

images:[
"Faculty1.jpeg",
"Faculty2.jpeg",
"Faculty3.jpeg",
"Faculty4.jpeg",
"Faculty5.jpeg"
],

points:[
"Use strong passwords for college accounts.",
"Protect student records and personal data.",
"Verify meeting links before joining online classes.",
"Do not share official login credentials.",
"Regularly update your computer and software."
]
},

{
title:"📱 Mobile Safety",

images:[
"Mobile1.jpeg",
"Mobile2.jpeg",
"Mobile3.jpeg",
"Mobile4.jpeg",
"Mobile5.jpeg"
],

points:[
"Install apps only from trusted stores.",
"Keep Screen Lock enabled.",
"Don't download unknown APK files.",
"Update Android regularly.",
"Use antivirus if needed."
]
},

{
title:"🔐 Password Safety",

images:[
    "Password1.jpeg",
    "Password2.jpeg",
    "Password3.jpeg",
    "Password4.jpeg",
    "Password5.jpeg",
],

points:[
"Use at least 8 characters.",
"Mix letters, numbers and symbols.",
"Never reuse the same password.",
"Enable Two-Factor Authentication.",
"Don't save passwords on public devices."
]
},

{
title:"💳 UPI & Banking Safety",

images:[
    "Bank1.jpeg",
    "Bank2.jpeg",
    "Bank3.jpeg",
    "Bank4.jpeg",
    "Bank5.jpeg",
],

points:[
"Never share your UPI PIN.",
"Banks never ask for OTP.",
"Verify QR codes before payment.",
"Check transaction details carefully.",
"Report fraud immediately."
]
},

{
title:"🌐 Internet Safety",

images:[
    "Internet1.jpeg",
    "Internet2.jpeg",
    "Internet3.jpeg",
    "Internet4.jpeg",
    "Internet5.jpeg",

],

points:[
"Visit only trusted websites.",
"Check HTTPS before entering details.",
"Avoid public Wi-Fi for banking.",
"Don't download unknown files.",
"Think before sharing personal information."
]
}

];

let output="";

tips.forEach((section,index)=>{

output+=`
<div class="tipCard">

<h2>${section.title}</h2>

${
section.images ? `
<div class="tipSlider">

    ${section.images.map((image,i)=>`
        <img 
            src="${image}" 
            class="tipSlide ${i === 0 ? "active" : ""}"
            alt="Cyber Safety Tip"
        >
    `).join("")}

</div>

<div class="sliderDots">

    ${section.images.map((image,i)=>`
        <span class="sliderDot ${i === 0 ? "active" : ""}"></span>
    `).join("")}

</div>
` : ""
}

<ul>

${section.points.map(point=>`<li>${point}</li>`).join("")}

</ul>

</div>
`;

});

document.getElementById("tipsBox").innerHTML=output;


/* Automatic Student Safety Image Slider */

const sliders = document.querySelectorAll(".tipSlider");

sliders.forEach((slider) => {

    const slides = slider.querySelectorAll(".tipSlide");
    const dots = slider.nextElementSibling
        ? slider.nextElementSibling.querySelectorAll(".sliderDot")
        : [];

    let currentSlide = 0;
    let startX = 0;
    let endX = 0;


    function showSlide(index){

        slides[currentSlide].classList.remove("active");

        if(dots[currentSlide]){
            dots[currentSlide].classList.remove("active");
        }

        currentSlide = index;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        if(currentSlide < 0){
            currentSlide = slides.length - 1;
        }

        slides[currentSlide].classList.add("active");

        if(dots[currentSlide]){
            dots[currentSlide].classList.add("active");
        }
    }


    /* Automatic slider */

    setInterval(() => {

        showSlide(currentSlide + 1);

    }, 3000);


    /* Swipe */

    slider.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;

    });


    slider.addEventListener("touchend", (e) => {

        endX = e.changedTouches[0].clientX;

        const difference = startX - endX;


        if(difference > 50){

            showSlide(currentSlide + 1);

        }


        if(difference < -50){

            showSlide(currentSlide - 1);

        }

    });

});