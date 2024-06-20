document.getElementById('retirement').addEventListener('click', function() {
    navigateToQuestionPage(1);
});

document.getElementById('firstBucket').addEventListener('click', function() {
    navigateToQuestionPage(2);
});

document.getElementById('assetProtection').addEventListener('click', function() {
    navigateToQuestionPage(3);
});

document.getElementById('educationSavings').addEventListener('click', function() {
    navigateToQuestionPage(4);
});

document.getElementById('buyHouse').addEventListener('click', function() {
    navigateToQuestionPage(5);
});

document.getElementById('wealthAccumulation').addEventListener('click', function() {
    navigateToQuestionPage(6);
});

function navigateToQuestionPage(contextId) {
    window.location.href = `question.html?contextId=${contextId}`;
}
