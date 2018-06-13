git hub repo
ALWAYS TEST https://jif.bergenrisk.com/api/v1/adjuster
to see changes must commit

5/10/18
to do
1 - Convert and document the conversion
2 - Show entire system to D & K 3 - Demonstrate a billing adjuster payments
and invoices
3 -x take away adjuster payment on claim
4 -x add carrier adjuster (after carrier is entered ) to seach on invoice
5 - search invoices will only include status 1 or 2 
6 - Add ability to open claim from the invoice form
7 - discuss users and roles
8 - show adjusters status 1 or 2   Threhold for every month to pay Phil/Guida a commision for net ar (which is invoice amt - expenses)
for 5 12
add code type to form
global search and replace to delete a code
replace all small forms with in place edit 
only show exit message on dirty form
dont accept no search values on some forms
6/13/18
1.  change this.currentItem.isDirty = () => {
     return JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)
    };

2. Add claim only works after a successful search
3. {  "CLAIM_NO" : "99-000002"} has the minimum of fields   
4. fix in add and Convert
  "insco" : {
        "NAME" : "HARRG (NY)", 
        "ADDRESS" : "P.O. Box 189", 
        "INSURANCE_COMPANY_ID" : NumberInt(314)
    },  
to do a comparison
D_AMT
COMMENTS
DATE_INSTITUTED
DATE_OF_LOSS
DEFAULT_FEE
DEFENSE_ATTY
DESCRIPTION
EDITED
FORMAL_INSTITUTED
INSURANCE_ADJUSTER_ID
INSURANCE_COMPANY_ID
INSURED_ID
INV_STATUS
JURISDICTION_ID
LEGAL_NAME
LOCATION_ID
MARK_CLAIMOFFICE_ID
MULTI_CLAIMANTS
MULTI_NAMES
OPEN_AMT
PERIOD
PLAINTIFF_ATTY
POLICY_DEDUCTABLE
POLICY_EXPIRATION
POLICY_INCEPTION
POLICY_LIMITS
POLICY_NO
POLICY_NUMBER
RECEIVED
RECOVERY_AGAINST
RECOVERY_AVAIL
RECOVERY_COMMENTS
RECOVERY_DATE_FILED
RECOVERY_EST
RECOVERY_LIEN_FILED
RECOVERY_TYPE
REOPEN_FLAG
REPORTED
STATUS
TOTHRS
adjusters[]
claimant{}
diaries[]
docs[]
insco{}
inscontact{}
insured{}
isReviewed
primaryAdjuster