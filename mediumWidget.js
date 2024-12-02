const utils = importModule('utils');
const {
    DEVICE_LOCALE,
    STYLE,
    CARD_NAME,
    BACKGROUND_COLOR,
    TOTAL_SPENT,
    MONTHLY_LIMIT,
    RECENT,
    CURRENCY_CODE,
    CARD_TYPE,
    CLOSING_DATE,
    EMOJI
} = importModule('constants');


function main() {
    const widget = new ListWidget();
    const mainColumn = widget.addStack();
    mainColumn.layoutVertically();
    mediumRow_1(mainColumn);
    mediumRow_2(mainColumn, remainingBalance);
    mediumRow_3(mainColumn);
    mediumRow_4(mainColumn);
}


function addCardNameLabel(row_1) {
    const cardNameLabel = row_1.addText(CARD_NAME);
    cardNameLabel.font = STYLE.font.row_1;
}


function addDaysLeftLabel(row_1) {
    const currentDate = utils.formatCurrentDate();
    const numberOfDays = utils.daysBetweenDAtes(currentDate, CLOSING_DATE);
    const daysLeftLabel = row_1.addText(`${EMOJI} ${numberOfDays}`);
    daysLeftLabel.font = STYLE.font.row_1;
}


function mediumRow_1(mainColumn) {
    const row_1 = mainColumn.addStack();
    addCardNameLabel(row_1);
    row_1.addSpacer();
    addDaysLeftLabel(row_1);
    mainColumn.addSpacer();
}


function addCurrentBalance(row_2) {
    const currentBalance = utils.formatCurrency(TOTAL_SPENT, DEVICE_LOCALE, CURRENCY_CODE);
    const currentBalanceLabel = row_2.addText(currentBalance);
}


function addRemainingBalance(row_2) {
    const remainingBalance = utils.formatCurrency('remainingBalance', DEVICE_LOCALE, CURRENCY_CODE);
    const remainingBalanceLabel = row_2.addText(remainingBalance);
    remainingBalanceLabel.textColor = utils.getBalanceColor('remainingBalance');
    remainingBalanceLabel.font = STYLE.font.row_2;
}


function mediumRow_2(mainColumn) {
    const row_2 = mainColumn.addStack();
    if (CARD_TYPE === "CURRENT BALANCE") {
        addCurrentBalance(row_2);
    } else {
        addRemainingBalance(row_2);
    }
    mainColumn.addSpacer();
}

function addCardTypeBackground(row_3) {
    const cardTypeBackground = row_3.addStack();
    cardTypeBackground.cornerRadius = 5;
    cardTypeBackground.setPadding(5, 10, 5, 10);
    cardTypeBackground.backgroundColor = new Color(utils.getMonochromeColor(BACKGROUND_COLOR));
    return cardTypeBackground;
}


function addAlignmentStack(row_3) {
    const alignmentStack = row_3.addStack();
    alignmentStack.setPadding(5, 10, 5, 10);
    return alignmentStack;
}


function addCardTypeLabel(backgroundStack) {
    const cardTypeLabel = backgroundStack.addText(`${CARD_TYPE}`);
    cardTypeLabel.font = STYLE.font.row_3;
}


function addCheckingLabel(alignmentStack) {
    let checkingLabel;
    if ('checkingBalance' === MONTHLY_LIMIT) {
        checkingLabel = alignmentStack.addText("CHK: MAX");
        checkingLabel.textColor = STYLE.color.greyedOut;
    } else {
        let formattedChecking = utils.formatCurrency(checkingBalance, DEVICE_LOCALE, CURRENCY_CODE);
        checkingLabel = alignmentStack.addText(`CHK: ${formattedChecking}`);
    }
    checkingLabel.font = STYLE.font.row_3;
}

function addSavingsLabel(alignmentStack) {
    let savingsLabel;
    if ('savingsBalance' === 0) {
        savingsLabel = alignmentStack.addText("SAV: ←");
        savingsLabel.textColor = STYLE.color.greyedOut;
    } else {
        let formattedSavings = utils.formatCurrency(savingsBalance, DEVICE_LOCALE, CURRENCY_CODE);
        savingsLabel = alignmentStack.addText(`SAV: ${formattedSavings}`);
        savingsLabel.textColor = STYLE.color.negativeBalance;
    }
    savingsLabel.font = STYLE.font.row_3;
}


function mediumRow_3(mainColumn) {
    const row_3 = mainColumn.addStack();
    const backgroundStack = addCardTypeBackground(row_3);
    const alignmentStack = addAlignmentStack(row_3);
    if (CARD_TYPE === "CURRENT BALANCE") {
        addCardTypeLabel(backgroundStack);
        mainColumn.addSpacer();
        return;
    }
    addCardTypeLabel(backgroundStack);
    addCheckingLabel(alignmentStack);
    addSavingsLabel(alignmentStack);
    mainColumn.addSpacer();
}


function mediumRow_4(mainColumn) {
    const row_4 = mainColumn.addStack();

    // Last Activity Label
    const lastActivityLabel = row_4.addText("Last Activity: ");
    lastActivityLabel.font = STYLE.font.row_4;

    // Activity Amount
    let formattedAmount = RECENT;
    if (typeof (RECENT) == "number") {
        if (RECENT > 0) {
            formattedAmount = '-' + formatCurrency(RECENT, DEVICE_LOCALE, CURRENCY_CODE);
        } else {
            formattedAmount = '+' + formatCurrency((RECENT * -1), DEVICE_LOCALE, CURRENCY_CODE);
        }
    }

    // Amount Label
    const amountLabel = row_4.addText(formattedAmount);
    if (formattedAmount == 'N/A') {
        amountLabel.textColor = STYLE.color.greyedOut;
    }
    amountLabel.font = STYLE.font.row_4
    row_4.addSpacer();

    // Current Time Label
    const currentTime = getTime();
    const currentTimeLabel = row_4.addText(currentTime);
    currentTimeLabel.font = STYLE.font.row_4;

    // Row 4 complete
    mainColumn.addSpacer();
}
