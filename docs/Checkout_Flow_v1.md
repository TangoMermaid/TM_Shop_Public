Below is the **master specification**. Keep it as a Markdown file in your repo:

```
docs/Checkout_Flow_v1.md
```

(Just copy-paste this message.)

---

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
* basket greeting ("Treasures in YOUR BASKET")
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
ACCEPT TYPING works exactly like SEARCH.

If found:

↓

STATE 3

If not:

Remain in STATE 5.

---

# STATE 6 — Basket updated

After ADD TO BASKET:

Update:

* item count
* subtotal
* discounts
* total

Append item to basket list.

Each basket item contains:

* thumbnail
* Item ID
* description
* price
* DELETE button

Activate:

* PAY
* SEE ALL ITEMS

Return to

↓

STATE 1

(Camera waiting.)

---

# STATE 7 — Basket review

Customer presses

SEE ALL ITEMS.

Scroll to basket.

Customer may

DELETE any item.

Totals recalculate immediately.

---

# STATE 8 — Payment

Customer presses PAY.

Customer selects payment method.

Order summary shown.

Customer confirms payment.

Order saved.

Inventory updated later by admin.

---

# STATE 9 — Finished

Display:

Thank you.

Basket cleared.

Return to STATE 0.

---

# Quit behaviour

QUIT does NOT immediately destroy basket.

Basket survives temporarily.

Exact timeout:

(TBD)

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

## Design principle

**One active task at a time.**

The customer should never wonder what to do next.

Every screen should have one primary action.

---

I intentionally kept this concise. It should stay under about 3 pages even as we refine it. From now on, whenever we change the flow, we update this document first, then the code. That will keep the project organized without creating heavy documentation.
