function BankAccountValidation_Interactive_Validate_v2_00(Key, AccountNumber, SortCode) {

   
    return $.getJSON("https://services.postcodeanywhere.co.uk/BankAccountValidation/Interactive/Validate/v2.00/json3.ws?callback=?",
    {
        Key: Key,
        AccountNumber: AccountNumber,
        SortCode: SortCode
    }).done(function (data) {
        return data;
        // Test for an error
        if (data.Items.length == 1 && typeof(data.Items[0].Error) != "undefined") {
           
            // Show the error message
            alert(data.Items[0].Description);
          
        }
        else {
            // Check if there were any items found
            if (data.Items.length == 0){
          
                alert("Sorry, there were no results");
                
            }
            else {

                var test = data.Items[0].IsDirectDebitCapable;
              
                // PUT YOUR CODE HERE
                //FYI: The output is a JS object (e.g. data.Items[0].IsCorrect), the keys being:
                //IsCorrect
                //IsDirectDebitCapable
                //StatusInformation
                //CorrectedSortCode
                //CorrectedAccountNumber
                //IBAN
                //Bank
                //BankBIC
                //Branch
                //BranchBIC
                //ContactAddressLine1
                //ContactAddressLine2
                //ContactPostTown
                //ContactPostcode
                //ContactPhone
                //ContactFax
                //FasterPaymentsSupported
                //CHAPSSupported
            }
        }
    });

   
}
    