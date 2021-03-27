//INPUTS RECEIP
const PLATFORM_FEE_INPUT = document.getElementById('platform-fee-input');
const EXCHANGE_COST_INPUT = document.getElementById('exchange-cost-input');
const PROCESSING_COST_INPUT = document.getElementById('processing-cost-input');
const AMOUNT_ORG_INPUT = document.getElementById('amount-organization-input');
const SUBMIT_INPUT = document.getElementById('submit')
//TOTAL
const TOTAL_TEXT = document.getElementById('showTotal')
// BAR PARTS
const AMOUNT_ORG = document.getElementById('amount-organization');
const PROCESS_COST = document.getElementById('processing-cost');
const EXCHANGE_COST = document.getElementById('exchange-cost');
const PLATFORM_FEE = document.getElementById('platform-fee');
const MONEY_ORG_TEXT = document.getElementById('money-to-organization')
//STYLE 
const BAR_CONTAINER = document.getElementById('bar-container');
const BAR = document.getElementById('bar')
//STYLE INPUTS
const BAR_HEIGHT = document.getElementById('bar-height')
const BAR_WIDTH = document.getElementById('bar-width')
//SUBMIT STYLE
const SUBMIT_STYLE = document.getElementById('submitBarStyle')


///Default Values
const receipt = {
    amountToOrg: 48.2234,
    processingCost: 0.755,
    exchangeCost: 0,
    platformFee: 1.0213,
}

//EVENT CREATE NEW RECEIP
SUBMIT_INPUT.addEventListener('click', (e) => {
    e.preventDefault()
    let newReceipt = {
        amountToOrg: AMOUNT_ORG_INPUT.value,
        processingCost: PROCESSING_COST_INPUT.value,
        exchangeCost: EXCHANGE_COST_INPUT.value,
        platformFee: PLATFORM_FEE_INPUT.value,
    }

    try {
        Object.values(newReceipt).forEach(e=> validate(e))
        const finalReceipt = processedToPercentageAndTotalReceipt(newReceipt)
        renderPercentagesAndText(finalReceipt)
    } catch (err) {
        alert(err.message)
    }
})

//UPDATE BAR STYLE
SUBMIT_STYLE.addEventListener('click', (e) => {
    e.preventDefault()
    let height = BAR_HEIGHT.value
    let width = BAR_WIDTH.value

    try {
        validate(height)
        validate(width) 

        updateStlyeInputs(height, width)
    } catch (err) {
        alert(err.message)
    }
})

// RENDER FIRST TIME
const finalReceipt = processedToPercentageAndTotalReceipt(receipt)
renderPercentagesAndText(finalReceipt)
updateStlyeInputs()


///FUNCTIONS
function processedToPercentageAndTotalReceipt(receipt) {
    const total = Object.values(receipt).reduce((a,b)=> +a + +b);
    const obj = {
        amountToOrg: percentage(receipt.amountToOrg, total),
        processingCost: percentage(receipt.processingCost, total),
        exchangeCost: percentage(receipt.exchangeCost, total),
        platformFee: percentage(receipt.platformFee, total),
        amountToShow: +receipt.amountToOrg
    }
    updateInputs(receipt)
    showTotal(total)
    return obj
}


///// DOM FUNCTIONS ////

//STYLE
function renderPercentagesAndText(receipt) {
    PLATFORM_FEE.style.width = `${receipt.platformFee}%`
    EXCHANGE_COST.style.width = `${receipt.exchangeCost}%`
    PROCESS_COST.style.width = `${receipt.processingCost}%`
    AMOUNT_ORG.style.width = `${receipt.amountToOrg}%`
    MONEY_ORG_TEXT.textContent = `$${receipt.amountToShow.toFixed(2)}`

console.log('percentages and amount to show', receipt)
}
//INPUTS
function updateInputs(receipt) {
    PLATFORM_FEE_INPUT.value = receipt.platformFee
    EXCHANGE_COST_INPUT.value = receipt.exchangeCost
    PROCESSING_COST_INPUT.value = receipt.processingCost
    AMOUNT_ORG_INPUT.value = receipt.amountToOrg
}

function updateStlyeInputs(height, width) {
    if (height && width) {
        BAR_CONTAINER.style.width = width + "px"
        BAR.style.height = height + "px"
    }
    BAR_HEIGHT.value = BAR.clientHeight
    BAR_WIDTH.value = BAR_CONTAINER.clientWidth
}


function showTotal(total) {
    TOTAL_TEXT.textContent = `$${total.toFixed(2)}`
}


/////// UTILS  //////
    
function percentage(amount,total) {
    return (amount/total) * 100
}
    
function validate(string) {
    if (string.trim().length === 0) {
        throw Error('Some field is empty')
    }
    if (string.includes(',')) {
        throw Error('Please use dot instead of commas')
    }
    if (isNaN(parseInt(string))) {
        throw Error(`${string} is not a number`)
    }
    return true
}