$(function(){

    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(parseInt(budget.total));
        $('#limit').text(budget.limit);
    })

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total','limit'],function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal},function(){
                if(amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type : 'basic',
                        iconUrl : 'algodaric64.png',
                        title : 'Limit reached!',
                        message : "Uh oh! Looks like you've reached your limit"
                    };
                    chrome.notifications.create('limitNotification',notifOptions);
                }
            });


            $('#total').text(newTotal);
            $('#amount').val('');

        });
    });
});