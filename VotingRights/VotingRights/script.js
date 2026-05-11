const pages = {
    home: {
        title: "The Situation",
        subtitle: "A breakdown of the SAVE America Act in 2026.",
        content: `
            <div class="card">
                <p>The Safeguard American Voter Eligibility Act is a federal proposal that would fundamentally change how we register to vote. Right now, most states let you sign a document under penalty of perjury to prove you are a citizen. If the SAVE Act passes, that wouldn't be enough anymore. You would be required to show a physical document like a passport or a birth certificate before you could ever be added to the voter rolls.</p>
                <p>Supporters say this is necessary to ensure only citizens are voting. However, critics point out that millions of Americans do not have these documents readily available. For people who have changed their names after getting married, the process becomes even harder because they have to provide extra court documents to bridge the gap between their birth name and their current legal name.</p>
                <a href="https://www.congress.gov/bill/118th-congress/house-bill/8281" target="_blank" class="source">Source: Congress.gov Legislative Tracker (H.R.8281)</a>
            </div>
        `
    },
    saveAct: {
        title: "The Document Check",
        subtitle: "Check if you have the 'Proof of Citizenship' required by 2026 mandates.",
        content: `
            <div class="card">
                <p>Under the new rules, simply knowing you are a citizen isn't enough. You need the paper to prove it.</p>
                <label style="display:block; margin:20px 0;"><input type="checkbox" id="hasDoc"> I have a physical Passport or Birth Certificate in my possession.</label>
                <label style="display:block; margin:20px 0;"><input type="checkbox" id="nameMatch"> My current legal name matches that document exactly.</label>
                <button onclick="runSim()">Check Eligibility</button>
                <div id="statusResult" class="hidden"></div>
            </div>
        `
    },
    travel: {
        title: "The Cost of Voting",
        subtitle: "Calculate the time and money spent to comply with new ID laws.",
        content: `
            <div class="card">
                <p>If you don't have your documents, you have to travel to an election office or vital records department. Use this to see the true cost of a "free" vote.</p>
                <label>Distance to nearest office (miles)</label>
                <input type="number" id="miles" class="calcInput" placeholder="e.g. 15">
                <label>Hourly Wage ($)</label>
                <input type="number" id="wage" class="calcInput" placeholder="e.g. 18">
                <button onclick="calcCost()">Calculate Cost</button>
                <div id="calcResult" class="resultBox hidden"></div>
            </div>
        `
    },
    action: {
        title: "Take Action",
        subtitle: "Don't just watch. Respond.",
        content: `
            <div class="card">
                <h3>Check Your Registration</h3>
                <p>Deadlines for the 2026 midterms are approaching fast. Make sure your info is current.</p>
                <button onclick="window.open('https://vote.org')">Go to Vote.org</button>
            </div>
        `
    }
};

function showPage(pageKey) {
    const page = pages[pageKey];
    document.getElementById('pageTitle').innerText = page.title;
    document.getElementById('pageSubtitle').innerText = page.subtitle;
    document.getElementById('dynamicArea').innerHTML = page.content;
    document.querySelectorAll('.navLinks li').forEach(li => li.classList.remove('active'));
    document.getElementById('nav' + pageKey.charAt(0).toUpperCase() + pageKey.slice(1)).classList.add('active');
}

function runSim() {
    const hasDoc = document.getElementById('hasDoc').checked;
    const nameMatch = document.getElementById('nameMatch').checked;
    const result = document.getElementById('statusResult');
    result.classList.remove('hidden');
    result.style.padding = "20px";
    result.style.marginTop = "20px";
    result.style.borderRadius = "6px";

    if (hasDoc && nameMatch) {
        result.style.background = "#1a3321";
        result.innerHTML = "✅ <strong>You are clear.</strong> You have the documentation required to register under the current proposal.";
    } else {
        result.style.background = "#331a1a";
        result.innerHTML = "❌ <strong>Access Blocked.</strong> Without a matching physical document, you would be unable to register to vote until you obtained new certified records.";
    }
}

function calcCost() {
    const miles = document.getElementById('miles').value;
    const wage = document.getElementById('wage').value;
    const resultBox = document.getElementById('calcResult');
    
    if(!miles || !wage) return alert("Please enter both values");

    const travelTime = (miles / 30) * 2; // Assume 30mph avg round trip
    const gasCost = (miles / 25) * 3.50; // Assume 25mpg and $3.50 gas
    const lostWages = travelTime * wage;
    const total = gasCost + lostWages;

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
        <strong>Your estimated cost: $${total.toFixed(2)}</strong><br>
        This includes roughly ${travelTime.toFixed(1)} hours of travel time and lost wages. In 2026, many rural voters face costs exceeding $100 just to register.
    `;
}

showPage('home');