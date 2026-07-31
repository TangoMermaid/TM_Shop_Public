1. Fonts. 

*"WELCOME to Tango Mermaid!" : Sweet Dreams font, size 13



*"Let's fill your BASKET:" in Source Sans 3 BOLD, size 14



*"ITEMS: 0

Sum-up: 0.00 € 

Campaign: -

Discount applied: -" all in Source Sans 3 MEDIUM, size 9, except "ITEMS: 0", "0" is in Source Sans 3 BLACK



*"TOTAL: 0.00 €" same idea, all in Source Sans 3 MEDIUM, size 9, except "0.00", which is in Source Sans 3 BLACK



*"Payment method:" in Source Sans 3 MEDIUM, size 9



*"Have a discount code?" in Source Sans 3 MEDIUM, size 9

2. Colours. Main palette:

#dfc5af = main beige

#f4ece6 = light beige

#77bdbf =blue

#000000 = black

#b4b4b4 = dark grey (used for greyed-out buttons: button border and font)

#ededed = light grey (used for greyed-out buttons: button fill)

3. They do not design for one phone. They design for a safe viewport.

The main rules are:

Keep important controls away from the edges. Usually 16–24 px side margins.
Assume the screen may be shorter. Anything below the fold is expected to require scrolling.
Don't rely on the fold occurring at an exact place. The user may have a taller or shorter phone.
Make buttons large. About 44–48 px minimum height.
Use flexible layouts. Avoid fixed vertical positioning when possible.

For Tango Mermaid, I suggest:

390 px design width (keep it).
844 px as our reference phone (keep the fold lines).
Treat the red lines as guides only, not hard boundaries.
Make sure every screen's primary action (e.g. SCAN, ADD IT!, PAY) is visible without scrolling on the reference phone.
It's perfectly acceptable if on a shorter phone the user needs to scroll a little. That's normal.

I would add red fold lines every 844 px and simply ignore the exact position on individual devices. If the design looks good against those guides, it will look good on almost any modern phone.

I think your idea of permanent fold guides is excellent. They will make the rest of the project much easier.



=======================================================
Your hybrid idea

I think this is the sweet spot.

paymentPanel
│
├── header (fixed)
├── instructions (fixed)
├── paymentBlockContainer
│      │
│      ├── bankTransferBlock
│      ├── paypalBlock
│      ├── mobilePayBlock
│      └── ...
├── declaration (fixed)
├── button (fixed)
└── footer (fixed)

When the user chooses:

Bank transfer

only this becomes visible:

bankTransferBlock

Everything else stays untouched.

Even better...

I wouldn't even remove the inactive blocks.

I'd simply do:

display:none;

and

display:block;

So the JS becomes almost trivial:

hideAllPaymentBlocks();

bankTransferBlock.style.display = "block";

That's robust, easy to debug, and if you ever add a new payment method, you only create one new beige block and one line to show it.

I think this is the best architecture we've designed so far.

It follows the same philosophy you've been using throughout the project:

one responsibility per component,
minimal JavaScript,
mostly HTML/CSS,
easy to duplicate,
low risk when changing one payment method,
and a stable outer shell that rarely needs editing.

I don't think I'd simplify it any further. It's a very maintainable structure for the unattended checkout you're building.
