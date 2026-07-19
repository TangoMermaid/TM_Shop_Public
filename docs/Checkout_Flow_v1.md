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

Open Checkout page.

Display:

* Logo
* Greeting
* Empty basket summary
* Disabled PAY button
* Disabled SEE ALL ITEMS button
* SCAN THE TAG button
* Camera area (waiting)

---

# STATE 1 — Waiting to scan

Camera inactive until customer presses:

> SCAN THE TAG

Camera permission requested.

If accepted:

Camera becomes active.

Instruction:

> Scan the QR code on the Tango Mermaid tag.

Available:

* Quit

---

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

Hide camera.

Display:

* Item photo
* Compliment
* Item ID
* Category
* Description
* Price

Buttons:

* ADD TO BASKET
* RE-SCAN / TYPE CODE

---

# STATE 4 — Scan failed

Display warning.

Manual code entry becomes visible.

Buttons:

* RE-SCAN
* TYPE CODE

ADD TO BASKET disabled.

---

# STATE 5 — Manual lookup

Customer types code.

ENTER works exactly like SEARCH.

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
