let currentMessage = "";
let currentReasons = [];
let currentRisk = "SAFE";
let currentClass = "safe";
let trustedBankSMS = false;

function startMessageAnalysis(){

    const message = document.getElementById("message").value.trim();

    if(message === ""){
        alert("Please enter a message first.");
        return;
    }

    document.getElementById("result").style.display = "none";
    document.getElementById("loading").style.display = "block";

    setTimeout(function(){

        document.getElementById("loading").style.display = "none";
        document.getElementById("result").style.display = "block";

        checkMessage();

    }, 2000);

}

function checkMessage(){

console.log("checkMessage started");

let msg=document.getElementById("message").value.toLowerCase();

let result=document.getElementById("result");

let reasons=[];

let risk="SAFE";

let className="safe";

currentMessage = msg;

if(msg.includes("otp")){
reasons.push("OTP requested");
}

if(msg.includes("lottery") || msg.includes("winner") || msg.includes("prize")){
reasons.push("Fake lottery or prize");
}

if(msg.includes("gift")){
reasons.push("Gift scam detected");
}

if(msg.includes("kyc") || msg.includes("verify")){
reasons.push("KYC verification request");
}

if(msg.includes("account blocked") || msg.includes("account suspended")){
reasons.push("Account warning message");
}

if(msg.includes("loan")){
reasons.push("Loan scam detected");
}

if(msg.includes("refund")){
reasons.push("Refund scam detected");
}

if(msg.includes("click")){
reasons.push("Suspicious link request");
}

if(msg.includes("urgent")){
reasons.push("Urgent language");
}

if(
msg.includes("send money") ||
msg.includes("pay now") ||
msg.includes("upi pin")
){
reasons.push("Money request");
}

let bankTransaction = false;

if(
(msg.includes("debited") || msg.includes("credited")) &&
(msg.includes("a/c") || msg.includes("account")) &&
(msg.includes("avl bal") || msg.includes("available balance") || msg.includes("ref no") || msg.includes("ref"))
){
    trustedBankSMS = true;
}

if(
msg.includes("credited") ||
msg.includes("debited") ||
msg.includes("withdrawn") ||
msg.includes("transaction")
){
bankTransaction = true;
}

if(msg.includes("mob bk") || msg.includes("avl bal")){
    trustedBankSMS = true;
}

/* Risk Level Detection */

let highRiskIndicators = 0;


/* Extremely dangerous indicators */

if(msg.includes("otp")){
    highRiskIndicators++;
}

if(msg.includes("upi pin")){
    highRiskIndicators++;
}

if(msg.includes("password")){
    highRiskIndicators++;
}

if(
    msg.includes("send money") ||
    msg.includes("pay now") ||
    msg.includes("transfer money")
){
    highRiskIndicators++;
}

if(
    msg.includes("account blocked") ||
    msg.includes("account suspended")
){
    highRiskIndicators++;
}

if(
    msg.includes("click") &&
    (
        msg.includes("urgent") ||
        msg.includes("verify") ||
        msg.includes("kyc")
    )
){
    highRiskIndicators++;
}


/* Final Risk */

if(highRiskIndicators >= 1){

    risk="HIGH RISK";
    className="highrisk";

}
else if(reasons.length >= 1){

    risk="SUSPICIOUS";
    className="suspicious";

}
else{

    risk="SAFE";
    className="safe";

}

// Trusted Bank SMS Detection
if(trustedBankSMS){

if(
msg.includes("click") ||
msg.includes("verify") ||
msg.includes("kyc") ||
msg.includes("otp") ||
msg.includes("password") ||
msg.includes("upi pin") ||
msg.includes("gift") ||
msg.includes("lottery") ||
msg.includes("winner")
){

risk="HIGH RISK";
className="highrisk";

}
else{

risk="SAFE";
className="safe";
reasons=[];

}

}

currentReasons = reasons;
currentRisk = risk;
currentClass = className;

result.className="";
result.classList.add(className);

if(reasons.length==0){

result.innerHTML=`
<h2>🟢 SAFE</h2>

<p>No common scam indicators found.</p>

<h3>🛡️ Safety Tips</h3>

<ul>
<li>✅ No common scam indicators found.</li>
<li>✅ Still verify unknown senders.</li>
<li>✅ Never share OTP or Password with anyone.</li>
<li>✅ Keep your device and apps updated.</li>
</ul>
`;

}
else{

result.innerHTML=`
<h2>
${risk=="SAFE"?"🟢 SAFE":risk=="SUSPICIOUS"?"🟡 SUSPICIOUS":"🔴 HIGH RISK"}
</h2>

<h3>📊 Analysis Summary</h3>

<p><b>Risk Level:</b>
${risk=="SAFE"?"🟢 SAFE":risk=="SUSPICIOUS"?"🟡 SUSPICIOUS":"🔴 HIGH RISK"}
</p>

<p><b>Scam Indicators:</b> ${reasons.length}</p>

<h3>📋 Reasons Found</h3>

<ul class="reason-list">
${reasons.map(r=>`<li>${r}</li>`).join("")}
</ul>

<h3>⚠️ What should you do?</h3>

<ul>
<li>🚫 Do not reply to this message.</li>
<li>🚫 Do not click any unknown links.</li>
<li>🚫 Never share OTP, Password or UPI PIN.</li>
<li>📞 Contact the official bank/company if needed.</li>
</ul>

<h3>🛡️ Safety Tips</h3>

<ul>
<li>❌ Never share OTP with anyone.</li>
<li>❌ Never share Password or UPI PIN.</li>
<li>❌ Don't click unknown links.</li>
<li>✅ Verify through the official website or customer care.</li>
<li>📞 If you suspect a scam, block and report the sender.</li>
</ul>

`;



}

console.log("checkMessage finished");
}

function startMessageAnalysis(){

    // जुना result hide करा
    document.getElementById("result").style.display = "none";

    // Loading दाखवा
    document.getElementById("loading").style.display = "block";

    setTimeout(function(){

        // Loading बंद करा
        document.getElementById("loading").style.display = "none";

        let msg = document.getElementById("message").value.trim();
        let result = document.getElementById("result");

        // Message रिकामा असेल
        if(msg === ""){

            result.style.display = "block";

            result.className = "";
            result.classList.add("suspicious");

            result.innerHTML = `
                <h2>No Message Entered</h2>

                <p>
                    You haven't entered the message in that table.
                    Please enter the message.
                </p>
            `;

            return;
        }

        // Message असेल तर normal analysis
        result.style.display = "block";

        checkMessage();

    },2000);

}

function checkEmail(){

    let email = document.getElementById("email").value.toLowerCase();

    let result = document.getElementById("emailResult");

    let reasons = [];

    let risk = "SAFE";
    let className = "safe";


    /* ==============================
       EMAIL SCAM INDICATORS
       ============================== */

    if(email.includes("click")){
        reasons.push("Suspicious link detected");
    }

    if(email.includes("verify")){
        reasons.push("Verification request");
    }

    if(email.includes("password")){
        reasons.push("Password request");
    }

    if(email.includes("otp")){
        reasons.push("OTP request");
    }

    if(email.includes("bank")){
        reasons.push("Bank related email");
    }

    if(email.includes("urgent")){
        reasons.push("Urgent language");
    }

    if(
        email.includes("prize") ||
        email.includes("winner") ||
        email.includes("lottery")
    ){
        reasons.push("Lottery or prize scam");
    }

    if(
        email.includes("account blocked") ||
        email.includes("account suspended") ||
        email.includes("account will be closed")
    ){
        reasons.push("Account threat detected");
    }

    if(
        email.includes("send money") ||
        email.includes("pay now") ||
        email.includes("payment required") ||
        email.includes("transfer money")
    ){
        reasons.push("Money request");
    }


    

    /* ==============================
   SMART HIGH RISK DETECTION
   ============================== */

let highRisk = false;


/* Direct sensitive information request */

if(
    email.includes("otp") ||
    email.includes("password") ||
    email.includes("upi pin") ||
    email.includes("pin") ||
    email.includes("send money") ||
    email.includes("pay now") ||
    email.includes("payment required") ||
    email.includes("transfer money")
){
    highRisk = true;
}


/* Strong phishing combination */

if(
    email.includes("click") &&
    email.includes("urgent") &&
    (
        email.includes("verify") ||
        email.includes("account blocked") ||
        email.includes("account suspended") ||
        email.includes("account will be closed")
    )
){
    highRisk = true;
}


/* Prize / lottery + money or personal information */

if(
    (
        email.includes("prize") ||
        email.includes("winner") ||
        email.includes("lottery")
    ) &&
    (
        email.includes("payment") ||
        email.includes("money") ||
        email.includes("otp") ||
        email.includes("password")
    )
){
    highRisk = true;
}


/* ==============================
   FINAL RISK LEVEL
   ============================== */

if(highRisk){

    risk = "HIGH RISK";
    className = "highrisk";

}

else if(reasons.length >= 1){

    risk = "SUSPICIOUS";
    className = "suspicious";

}

else{

    risk = "SAFE";
    className = "safe";

}


    /* ==============================
       RESULT STYLE
       ============================== */

    result.className = "";
    result.classList.add(className);


    /* ==============================
       SAFE RESULT
       ============================== */

    if(risk === "SAFE"){

        result.innerHTML = `

        <h2>🟢 SAFE</h2>

        <p>No common scam indicators found.</p>

        <h3>🛡️ Safety Tips</h3>

        <ul>

        <li>✅ Check the sender's email address.</li>

        <li>✅ Don't open unknown attachments.</li>

        <li>✅ Verify suspicious emails from the official website.</li>

        <li>✅ Keep your email account secure.</li>

        </ul>

        `;

    }


    /* ==============================
       SUSPICIOUS / HIGH RISK
       ============================== */

    else{

        result.innerHTML = `

        <h2>
        ${
            risk === "SUSPICIOUS"
            ? "🟡 SUSPICIOUS"
            : "🔴 HIGH RISK"
        }
        </h2>


        <h3>📊 Analysis Summary</h3>

        <p>
        <b>Risk Level:</b>
        ${
            risk === "SUSPICIOUS"
            ? "🟡 SUSPICIOUS"
            : "🔴 HIGH RISK"
        }
        </p>


        <p>
        <b>Scam Indicators:</b> ${reasons.length}
        </p>


        <h3>📋 Reasons Found</h3>

        <ul class="reason-list">

        ${
            reasons.map(r => `<li>${r}</li>`).join("")
        }

        </ul>


        <h3>⚠️ What should you do?</h3>

        <ul>

        <li>🚫 Don't click unknown links.</li>

        <li>🚫 Don't download unknown attachments.</li>

        <li>🚫 Never share OTP or Password.</li>

        <li>🚫 Don't send money based on an email request.</li>

        <li>📞 Verify using the official website.</li>

        </ul>


        <h3>🛡️ Safety Tips</h3>

        <ul>

        <li>✅ Check the sender's email address carefully.</li>

        <li>✅ Verify the email through the official website.</li>

        <li>✅ Don't reply to suspicious emails.</li>

        <li>✅ Report suspicious emails as spam or phishing.</li>

        </ul>

        `;

    }

}

function startEmailAnalysis(){

    // जुना result hide करा
    document.getElementById("emailResult").style.display = "none";

    // Loading दाखवा
    document.getElementById("emailLoading").style.display = "block";

    setTimeout(function(){

        document.getElementById("emailLoading").style.display = "none";

        let email = document.getElementById("email").value.trim();
        let result = document.getElementById("emailResult");

        // Empty email
        if(email === ""){

            result.style.display = "block";

            result.className = "";
            result.classList.add("suspicious");

            result.innerHTML = `
                <h2>No Email Entered</h2>

                <p>
                    You haven't entered the email in that table.
                    Please enter the email.
                </p>
            `;

            return;
        }


        // Proper Email Format Check
        let hasFrom = /^from\s*:/im.test(email);
        let hasTo = /^to\s*:/im.test(email);
        let hasSubject = /^subject\s*:/im.test(email);


        // जर proper email format नसेल
        if(!(hasFrom && hasTo && hasSubject)){

            result.style.display = "block";

            result.className = "";
            result.classList.add("suspicious");

            result.innerHTML = `
                <h2>Not an Email</h2>

                <p>
                    This is not an email; it is a message.
                    Please check it in the messages section.
                </p>
            `;

            return;
        }


        // Proper email असेल तर normal analysis
        result.style.display = "block";

        checkEmail();

    },2000);

}

function toggleGuide(topic){

    let box = document.getElementById(topic);

    // जर information आधीच open असेल तर बंद करा
    if(box.style.display === "block"){
        box.style.display = "none";
        box.innerHTML = "";
        return;
    }

    // बाकीची information बंद करा
    document.querySelectorAll(".guide-info").forEach(function(item){
        item.style.display = "none";
        item.innerHTML = "";
    });


    if(topic == "password"){

        box.innerHTML = `
        <h2>🔐 Password Safety</h2>

        <ul>
            <li>Use at least 12 characters.</li>
            <li>Use uppercase, lowercase, numbers and symbols.</li>
            <li>Never share your password.</li>
            <li>Enable Two-Factor Authentication (2FA).</li>
        </ul>
        `;

    }

    else if(topic == "otp"){

        box.innerHTML = `
        <h2>🔑 OTP Safety</h2>

        <ul>
            <li>Never share OTP with anyone.</li>
            <li>Banks never ask for OTP.</li>
            <li>Don't enter OTP on unknown websites.</li>
        </ul>
        `;

    }

    else if(topic == "upi"){

        box.innerHTML = `
        <h2>💳 UPI Safety</h2>

        <ul>
            <li>Never share your UPI PIN.</li>
            <li>Check the receiver before payment.</li>
            <li>Don't scan unknown QR codes.</li>
        </ul>
        `;

    }

    else if(topic == "email"){

        box.innerHTML = `
        <h2>📧 Email Safety</h2>

        <ul>
            <li>Check the sender's email address.</li>
            <li>Don't open unknown attachments.</li>
            <li>Beware of phishing emails.</li>
        </ul>
        `;

    }

    else if(topic == "browsing"){

        box.innerHTML = `
        <h2>🌐 Safe Browsing</h2>

        <ul>
            <li>Visit trusted websites only.</li>
            <li>Look for HTTPS.</li>
            <li>Avoid downloading unknown files.</li>
        </ul>
        `;

    }

    else if(topic == "social"){

        box.innerHTML = `
        <h2>📱 Social Media Safety</h2>

        <ul>
            <li>Keep your profile private.</li>
            <li>Don't accept unknown friend requests.</li>
            <li>Don't share personal information publicly.</li>
        </ul>
        `;

    }

    box.style.display = "block";
}

function showScam(type){

let scam=document.getElementById("scamResult");

if(type=="call"){

scam.innerHTML=`

<h2>📞 Fake Call Scam</h2>

<p><b>How it works:</b></p>

<ul>
<li>Scammers pretend to be bank or government officers.</li>
<li>They ask for OTP, ATM PIN or personal details.</li>
</ul>

<p><b>Safety Tips:</b></p>

<ul>
<li>Never share OTP or PIN.</li>
<li>Disconnect the call if you feel suspicious.</li>
<li>Call the official customer care number to verify.</li>
</ul>

`;

}

else if(type=="sms"){

scam.innerHTML=`

<h2>💬 Fake SMS Scam</h2>

<h3>How it works:</h3>

<div class="scam-list">
<ul>
<li>SMS contains fake links.</li>
<li>It creates urgency like "Your account will be blocked".</li>
</ul>
</div>

<h3>Safety Tips:</h3>

<ul>
<li>Don't click unknown links.</li>
<li>Verify using the official website.</li>
</ul>


`;

}

else if(type=="email"){

scam.innerHTML=`

<h2>📧 Phishing Email</h2>

<ul>
<li>Check sender's email address.</li>
<li>Don't download unknown attachments.</li>
<li>Never share passwords.</li>
</ul>

`;

}

else if(type=="upi"){

scam.innerHTML=`

<h2>💳 UPI Scam</h2>

<ul>
<li>Never share your UPI PIN.</li>
<li>Don't scan unknown QR codes.</li>
<li>Always verify the receiver.</li>
</ul>

`;

}

else if(type=="job"){

scam.innerHTML=`

<h2>💼 Job Scam</h2>

<ul>
<li>Never pay money for a job.</li>
<li>Verify the company before applying.</li>
<li>Beware of fake work-from-home offers.</li>
</ul>

`;

}

else if(type=="lottery"){

scam.innerHTML=`

<h2>🎁 Lottery Scam</h2>

<ul>
<li>Ignore messages claiming you've won a prize.</li>
<li>Never pay a fee to claim rewards.</li>
<li>Verify through official sources.</li>
</ul>

`;

}

}