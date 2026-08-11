const tips = [

{
title:"👨‍🎓 Student Safety",
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

tips.forEach(section=>{

output+=`
<div class="tipCard">

<h2>${section.title}</h2>

<ul>

${section.points.map(point=>`<li>${point}</li>`).join("")}

</ul>

</div>
`;

});

document.getElementById("tipsBox").innerHTML=output;