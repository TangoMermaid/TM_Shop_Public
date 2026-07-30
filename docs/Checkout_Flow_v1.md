# Tango Mermaid Checkout Flow v1.0

## Purpose

Self-service checkout for Tango Mermaid showroom.

The customer scans **one MAIN QR code** to enter the checkout page, then scans item tags to build a basket and pay.

---

# STATE 0 — Enter checkout

Customer scans MAIN QR.

Open MAIN_WEB page.

Display:
* delete&quit button 
* close- (and fold-??) window buttons
* Logo
* Greeting (= 2 lines: 1. "WELCOME to Tango Mermaid!", 2. "Let's fill your BASKET:")
  
* Empty basket summary 
(LEFT column)
"ITEMS: 0
Sum-up: 0.00 € 
Campaign: -
Discount applied: -"
(RIGHT column)
"TOTAL: 0.00 €"

* Discount code (under LEFT column = header "Have a discount code?" and empty field with a prompt "Type in your code")
* Payment Method (under RIGHT column = header "Payment method:" and a drop-down list "Not chosen")
* Disabled CHECK OUT button
* SCAN THE TAG ON YOUR ITEM button
* Camera area marker (waiting, camera not activated before SCAN THE TAG ON YOUR ITEM is pressed)
* page-down arrow
  
  When scrolled down (or page-down arrow) - on the same page but lower:
* basket greeting ("Treasures in YOUR BASKET:")
* basket itemisation placeholder in 2 lines: 1. "Nothig here yet.Hurry up and fill" 2. "your basket with treasures!"
* basket itemisation summary as above:
  (Left column)
"ITEMS: 0
Sum-up: 0.00 € 
Campaign*: none

Discount applied: none"

(Right column)
"TOTAL: 0.00 €"

* campaign explanations: "*Only one campaign per order.
Please choose your biggest discount and apply."

* TM stamp (small logo+email+phone nr)
* page-up arrow
---

# STATE 1.1 — Waiting to scan (activated by pressing SCAN THE TAG ON YOUR ITEM button)

Camera inactive until customer presses. After pressing
> SCAN THE TAG ON YOUR ITEM

-The rest of the screen gets darkened, the previous window state is visible but inaccessible under the dark layer
Active/accessible: 
camera window with its buttons, 
delete&quit button,
close- (and fold-??) window buttons-

> Camera permission request displayed via
screen message "Allow access to your camera?",
button that gives permission: "SURE!"

# STATE 1.2 — Camera activated
> If accepted by pressing "SURE!":

Camera becomes active.
Display Instructions in 2 lines: 1."Focus camera on the QR code", 2."- on the tag of your item -"

Available / active: same as inSTATE 1.1:
-The rest of the screen gets darkened, the previous window state is visible but inaccessible under the dark layer
Active/accessible: 
camera window with its buttons, 
delete&quit button,
close- (and fold-??) window buttons-

# STATE 2 — Scanning

Possible outcomes:

### Success

↓

STATE 3

### Camera cannot recognise code

↓

STATE 4

### Camera cancelled

↓

STATE 1

---

# STATE 3 — Item recognised
3.1 — Item recognised - success message
Camera becomes inactive = Hide camera
Display 
+Instructions in 2 lines: 1."Focus camera on the QR code", 2."- on the tag of your item -"
+Message "SUCCESS!"
+Recognised code in the format "TM000003"

3.2 — Item recognised - item info
Display (top to bottom):
* a slot with item ID code in the format "TM000003"
* Random Compliment

(inside camera-placeholder)
* Item photo
  
(in the down left corner of the camera-placeholder)
* Item ID (e.g."Item ID: TM000003")
* Category (e.g. "Product: Apparel")
* Description (e.g."Description: Pants")
* Price (e.g."Price: €40")

Active/accessible: 
* ADD IT!
* BACK
delete&quit button,
close- (and fold-??) window buttons-
---

# STATE 4 — Scan failed
Display (top to bottom): 

(above camera-placeholder)
* Manual code entry slot with a prompt "TM......  No scanning? Type in item ID from the tag"
* ACCEPT TYPING button
  
(inside camera-placeholder)
* warning in 2 lines: 1."Oops...something went wrong", 2. "Re-scan or type in manually"
* Instructions in 5 lines: 1."1. Find Item ID on the tag,", 2. "it looks like “TM000000”", 3."2. Type it into the slot", 4. "above", 5."3. Press “ACCEPT TYPING”"

(under camera-placeholder)
* RE-SCAN button
  
Active/accessible: 
* ACCEPT TYPING
* RE-SCAN
delete&quit button,
close- (and fold-??) window buttons-
---

# STATE 5 — Manual lookup

Customer types code inside Manual code entry slot with a prompt "TM......  No scanning? Type in item ID from the tag"

ENTER works exactly like SEARCH.
ACCEPT TYPING button works exactly like SEARCH.

If found:

↓

STATE 3

If not:

Remain in STATE 5.

---

# STATE 6 — Basket updated

Activated by pressing
> ADD IT! button

Screen darkening is removed!
*Display:
 delete&quit button 
 close- (and fold-??) window buttons
 Logo
 Greeting (= 2 lines: 1. "WELCOME to Tango Mermaid!", 2. "Let's fill your BASKET:")
  
(at the top of the page)
*Update basket summary:
ITEMS: 0 >> +1
Sum-up: 0.00 €  >> +Price from the item added
Campaign: - >> can be manually added at any stage, will affect Discount applied and calculation of TOTAL
Discount applied: - >> updates automatically based on the Campaign chosen
(RIGHT column)
"TOTAL: 0.00 € >> == "Sum-up" - "Discount applied"

*Activate:
CHECK OUT button

(Below that, in the 'camera' section)
*Display:
+ Notification in 3 lines: 1."WELL DONE!". 2. ItemID, e.g. "TM000003", 3."IS NOW THE BASKET"
+ in the camera-placeholder field: 1."Scan next?" 2.SURE button == active!

(Below that, in the scroll-down section)
*Append the added item to basket list, for each item added display:
+ thumbnail (left side)
+ Item ID (right side)
+ description (right side)
+ price (right side)
+ DELETE button (far right side)

*Update all the corresponding fields at the bottom of the page (under basket list):
(Left column)
ITEMS: 
Sum-up:  
Campaign*: >>if filled in displays Campaign Name + 2 lines below for Brief Campaign Description
Discount applied:
(Right column)
"TOTAL: 

(below that)
*Display 
+header "Your name and email - for the receipt:" witha 2-liner fill-in slot (with prompts: 1."Your full name please", 2."Your e-mail address")
+checkbox "Want to join TM club (discounts/updates)? "
+ceckbox "Did you read Privacy Policy and agreed?" (Privacy Policy as a link to a separate page)

+campaign explanations: "*Only one campaign per order.
Please choose your biggest discount and apply."

+"Payment method:" header + drop-down (==same as above)
+"Have a discount code?" + fill-in with a prompt "Have a discount code?" (==same as above)

+TM stamp (small logo+email+phone nr)
+ page-up arrow

> if SURE button is pressed:
Return to
↓
STATE 1.2 — Camera activated

---

# STATE 7 — Basket review

Customer presses

>CHECK OUT

Scroll to basket.

Customer may

DELETE any item by pressing the item-specific delete button on the far right side of each item 

Item list updates immediately
Totals recalculate immediately - everywhere

---

# STATE 8 — Pre-payment
STATE 8.1 Payment NOT ALLOWED
PAY button is NOT activated unless all 4 are in place:

1)At least 1 item is added to the basket
2)Name-email field is filled in correctly
3)Privacy policy box is checked
4)Payment method is chosen

STATE 8.2 Payment ALLOWED
>Customer presses PAY.
PAY button is activated when all 4 arefilled correctly:

1)At least 1 item is added to the basket
2)Name-email field is filled in correctly
3)Privacy policy box is checked
4)Payment method is chosen

Order summary shown.
Customer confirms payment.
Order saved under its running unique number in the format 12345678 with all the information filled in by customer.

Inventory updated later by admin.
---


# STATE 9 — Payment itself
Depending on the payment method chosen by the customer,
we shall display relevant info for customer to complete payment:

+order number (provide as a message)
+credentials
+slot to add screenshot of the transaction completed
+button 'I PAYED' - activated only after screenshot was submitted

Methods in use:
+Mobile Pay
+Siirto
+Bank transfer
+PayPal
+Cash - in person (greyed out unless special case is activated, perhaps having 'cash' in the Comments field is enough for an item to have this one activated - tbd )

[NB! I think that redirecting to the relevant pages will be too much coding and risk if not working...so I would prefer them to pay themselves, but if possible, I would make copy-paste easier for users. Cause they'd have to open/close the window all the time to fill in all the credentials...if not too much work - later

# STATE 10 — Finished
> after 'I PAID'is pressed, display:

"Congratulations, your order is complete!"

"Enjoy your Tango Mermaid treasures"
"and welcome again!"

"Your receipt will be sent to the email provided"

"Do not forget to share your experience on social media"
"time to shine!"

Basket cleared. 

Return to STATE 0.

---

# Quit behaviour

QUIT immediately destroys basket and deletes all the info.
Display message "Your basket was deleted"
Page window closes permanently

# Close behaviour
Basket survives temporarily, timeout: 30min.
Needed e.g. to complete payment

---

# Future modules

* campaigns
* automatic discounts
* reservations
* barcode scanner
* customer details
* email receipt
* payment integrations
* inventory update
* multi-language

---

## Design principles

**I.One active task at a time.**

The customer should never wonder what to do next.

Every screen should have one primary action.

**II.One page.**
All main activities should be done in one page. 
Exceptions: privacy statement (separate page with thext - to be filled)
Payments! 
---

I intentionally kept this concise. It should stay under about 3 pages even as we refine it. From now on, whenever we change the flow, we update this document first, then the code. That will keep the project organized without creating heavy documentation.
___________________________________________________________________________________________________________________________
___________________________________________________________________________________________________________________________
IMPRTANT
>>> Pay screenshot upload
A tiny Google Apps Script can:
receive the uploaded screenshot,
save it into your private TM Drive,
return "Upload successful".
The Drive folder remains completely private. The filename links the screenshot to the order.
This is free and integrates naturally with your existing Google ecosystem.

>>>Q&A 
1. Can the customer add the same item twice?
no way, all TM codes are uniques, even identical items will have unique codes >>reject as "already in the basket"
2. DELETE. 
After deleting the last item:
to 0.000, nothing is activated yed, they will start from scratch.
3.  Camera. After pressing SURE! ("Scan next?"), Should the camera start immediately,or should it wait until the user taps the camera window?
Immediately, we assume permission was already given, what alse to wait for
4. Payment. When the customer presses I PAID: Should the order become LOCKED (i.e. basket cannot be edited anymore) or still editable?
Absolutely LOCKED. Pressing I PAID finalises the whole transaction. The order is stored in TM system.
5. Payment screenshot. May the customer submit payment without a screenshot, or is the screenshot mandatory?
Mandatory. I strongly prefer that, otherwise I have no leverage at all...they can press anything and take my items without paying...what will I do...in case of serious disputes, in the court, I will have at least wrong picture that they submitted as a payment proof..
6. Should one order produce one JSON file 12345678.json or should all orders be appended into orders.json I already have a preference, but I'd like your decision.
Based on the amount of info we store, it can be (NOW) easily one json file. Order number will become matching screenshot's name - store it in repo in 'paid_screenshots' folder? What was your thought?


___________________________________________________________________________________________________________________________
___________________________________________________________________________________________________________________________
**ORDER MODEL for .json:**

Order Number
Status
Verification
Payment
Screenshot

Created DateTime

Customer Name
Customer Email

Items
Subtotal
Campaign
Discount
Total

Payment Method

Screenshot Filename
Comments
###
**WHERE**
Status:
CREATED
COMPLETED
CANCELLED

Verification:
UNCHECKED
VERIFIED
REJECTED

Payment:
NO
YES

Screenshot:
NO
RECEIVED
VERIFIED
REJECTED

===========================================================================
One suggestion for the next cleanup

We're starting to see a pattern: every state creates its own timer.

I suggest that after Prototype 2 is visually finished, we create one helper function:

cancelAllTimers();

Then BACK would simply call:

cancelAllTimers();

instead of remembering every individual timeout. It'll make the code much cleaner and prevent exactly this type of bug as more states are added.

===========================================================================
Proof-of-purchase screen. 
After the user got payment instructions - according to the chosen payment method (easy copy-paste option!)- they MUST submit a screenshot about payment where at least their NAME/and or item ID (message field) is visible!
Here are the options.
***Option 1 — No email verification (my preference for your showroom)

Customer enters:

Name
Email

The system checks only that the email looks valid (contains @, a domain, etc.).

Pros
Fast checkout.
No interruptions.
No internet dependency beyond opening the checkout page.
No risk of customers abandoning the purchase because they don't want to open their inbox.

Cons
They can mistype the email.
If payment is missing or incorrect, you may not be able to contact them.
***Option 2 — Verification email (one-time code or link)

Customer must verify the email before paying.

Pros

You know the email is real.
Easier to contact them later.
Better if you automatically issue receipts or manage accounts.

Cons

Adds friction.
Some customers will abandon the purchase.
Requires an email-sending backend and verification logic.
More moving parts to maintain.

***Option 3 — My favorite compromise

Keep the checkout simple.

After the customer presses PAY, show a confirmation screen like:

Payment instructions have been prepared.

Receipt will be sent to:

john.smith@email.com

Is this correct?

CHANGE EMAIL | CONTINUE

This catches a surprising number of typos because people notice mistakes when their address is displayed prominently.

Then, after payment proof is submitted, you send the receipt. If the email bounces, you still have:

the customer's name,
the payment screenshot,
the payment timestamp,
and (if applicable) the payer name from the payment itself.

"I tend to agree...although it does implement financial risk for me...untill the first loss, I can keep your Option3...But in that message we have to find a catch, something that will make the user really want to submit the correct email, like it should be important for them...e.g. 'any financial claim from a different email/name will not be considered legally' or so"
I think you're on the right track by making the customer understand why the email matters, but I'd avoid wording that sounds like a legal threat unless it's actually backed by your terms and applicable law. A statement like:

"Any financial claim from a different email/name will not be considered legally."

could create legal issues if, in reality, you'd still be required to handle a legitimate customer inquiry.

Instead, you can make the incentive practical and truthful.

For example:

Please check your email carefully.

Your receipt, payment confirmation, and any questions regarding this order will be sent to this address. If the email is incorrect, we may be unable to contact you regarding your purchase.

Or a stronger version:

Please make sure your email is correct.

This email address will be used as the primary contact for this order, including your receipt and any payment-related communication. An incorrect email may delay or prevent us from resolving issues with your order.

If you want to encourage careful checking without sounding hostile, you could even add:

Take a moment to check it now—it only takes a second and can save a lot of hassle later.

For Tango Mermaid, I think the strongest motivation isn't a warning—it's tying the email to something the customer wants:

their receipt,
confirmation that their payment was received,
updates if there's any issue,
and, if they opt in, TM Club benefits.

That gives them a positive reason to enter it correctly, while also making it clear that an incorrect address limits your ability to help if something goes wrong.
===================================================================================================================
Payment pscreens/procedure


────────────────────────────

PAY FOR YOUR ORDER

Please copy the information below and complete the payment in your selected payment app.

When the payment is complete, take a screenshot. You will be asked to submit it on the next screen.

Please make sure the screenshot clearly shows:

• the Order number (message)
• the paid amount

────────────────────────────

Recipient
Tango Mermaid                            [📋]

IBAN
FIxx xxxx xxxx xxxx xx                  [📋]

BIC
XXXXXXXX                                [📋]

Amount
€85.00                                  [📋]

Order number (Message)
48371                                   [📋]

────────────────────────────

☐ I hereby declare that I have completed the above payment in full and that the submitted screenshot is a true and accurate proof of this payment.

                [ I HAVE PAID ]


Then:

SUBMIT PAYMENT SCREENSHOT

Drag & Drop

or

Choose File

[image preview]

         [ SUBMIT SCREENSHOT ]


===============================================================================================================
Order numbering
We'll generate a 5-digit numeric order number, for example:

48371
10582
77419
03284

No TM prefix, so it cannot be confused with your product IDs (TM000123).

===============================================================================================================
Declaration checkbox on I PAID

"I hereby declare that I have completed the above payment in full and that the submitted screenshot is a true and accurate proof of the payment."
