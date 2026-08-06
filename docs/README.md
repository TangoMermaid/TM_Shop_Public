Connections and automation

I will simplify even what I posted before. Do you understand that I will be the one keeeping it all...the more complex it is, the more mistakes and problems in th efuture. Ofc I will try to automate most, but wtf...json is not a human-friendly-readable format. I will have to visualise this every time...see how it is filled. what actions are on me etc...before I have any DB set, it all will be hard. I have no time to set any DB now...so keep it simple

My big question now is: is it possible that I keep order number for order confirmation and receipt? Those orders that did not come through (cancelled, unpayed etc), their numbers will be skipped...so the order confirm and recipts will not have a perfect running sequence, but the numbers will be growing (easy to sort) and most importantly they will be corresponding to the order itself. Correct logic?

Now. The json I want, at least now. DO NOT change ANYTHING! Unless you have super-strong objections, do not even voice them here



1. ###
order_nr <AUTOFILL from order
order_status == open/closed,  only 2 options! <AUTOFILL from order as 'open' once order created
order_comment= (not sure how to word it)==cancelled/unpayed/send receipt!...==reflects overall status or action needed <AUTOFILL from order 'created'
when_opened [DateTime] ==when it is created in Netifly <AUTOFILL from order
when_closed [DateTime]  == when I send out a recipt (after receive money/'verify')

2. ###
cust_name <AUTOFILL from order
cust_email<AUTOFILL from order
cust_phone <AUTOFILL from order
tm_club == yes/no <AUTOFILL from order
privacy_accepted ==(how relevant is this if we do not let the order to be formed without that checkbox?? all are 'yes') <AUTOFILL from order as 'yes'

3. ###
items_IDs  <AUTOFILL from order
items_count  <AUTOFILL from order
subtotal <AUTOFILL from order 
campaign <AUTOFILL from order 
discount <AUTOFILL from order 
total <AUTOFILL from order
 
4. ###
pay_method <AUTOFILL from order
pay_proof_file <AUTOFILL from order with filename



5. ### 
when_confirm_sent [datetimestamp] <can be AUTOFILL from order if we can set auto-email! or empty
confirm_comments ==e.g. 'bounced' after <<manual...empty by default

when_recipt_sent [datetimestamp] <<manual...empty by default
receipt_comments ==e.g. 'bounced' <<manual...empty by default


==================================
And yes, I agree with using the same number for the order, the order confirmation, and the receipt.

Example:

TM000123 → Order created.
Customer never pays → there is no receipt, but TM000123 remains in the history.
TM000124 → Customer pays → receipt TM000124.

So your sequence becomes:

TM000121
TM000122
TM000123  (cancelled)
TM000124
TM000125  (unpaid)
TM000126

That's completely normal. Most business systems have gaps in numbering because some transactions are cancelled or never completed. The important thing is that one business case = one permanent number. It makes searching and auditing much easier.
=============================================
Regarding your JSON draft:

I have no strong objections.

In fact, I think it's the first version that is clearly optimized for your workflow rather than for an abstract software model.

Only two tiny comments, not changes:

privacy_accepted

You're right. It will always be "yes" because the order cannot exist otherwise.

I would still keep the field. It costs almost nothing, and years later you can prove that every stored order was created after accepting the privacy policy.

order_comment

I like the idea. It's not really a "status"; it's your working note.

Examples:

created
waiting payment
payment unclear
cancelled
receipt sent
customer contacted

That will become your "to-do" field, which is probably the most useful field in the whole file.

Overall, I think this model is very well suited to Tango Mermaid. I wouldn't add anything else before implementing it. The next step is to make the checkout populate exactly these fields and let the Netlify bridge append them to your orders.json.
