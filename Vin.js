let finalbill = 0;
let finaltip = 0;
let billamount = 0;
let tipAmount = 0;
$(document).ready(function() 
{
    $.getJSON("Vino.json", function (suggestions) 
    {
        $('#standard').text(suggestions.Suggestions[0].description + ': ' + suggestions.Suggestions[0].percentage + '%');
        $('#good').text(suggestions.Suggestions[1].description + ': ' + suggestions.Suggestions[1].percentage + '%');
        $('#excellent').text(suggestions.Suggestions[2].description + ': ' + suggestions.Suggestions[2].percentage + '%');
    });
});
function calculateTip()
{
    billamount = parseFloat(document.getElementById('billamount').value)
    if (isNaN (billamount))
    {
        alert ("Please enter a number");
        return;
    }
    tipPercentage = parseFloat ( document.getElementById('tipPercentage').value)
    if (isNaN (tipPercentage))
    {
        alert ("Please enter a number");
        return;
    }
    
    tipAmount = (billamount * tipPercentage) / 100;
    const totalAmount = billamount + tipAmount;;
    

    document.getElementById('result').innerHTML = 
    `<p>Tip Amount: $${tipAmount.toFixed(2)}</p>
    <p>Bill Amount: $${billamount}</p>
    <p>Total Bill: $${totalAmount.toFixed(2)}</p>`;

   

}

function Save() 
{
    
    finalbill = finalbill + billamount;
    finaltip = finaltip + tipAmount;
    document.getElementById('billamount').value = '';
    document.getElementById('tipPercentage').value = '';
    document.getElementById('result').innerHTML = '';

}
function End()
{
    alert("Total Revenue: $" + finalbill.toFixed(2) + "\nTotal tip amount: $" + finaltip.toFixed(2));
}
function download() 
{
    const data = 
    {
        "finalbill": finalbill,
        "finaltip": finaltip
    };
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const a = document.createElement("a");
    a.style.display = "none";
    const fileName = "Vino.json";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

