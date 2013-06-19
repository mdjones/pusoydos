

	var createDeck = function(conf){
	    var cards = [];
        var o = conf;
        var l,i,s,r;
        // populate draw pile
        for (i = 0; i < o.decks; i++) {
            // standard
            for (s in o.suits) {
                for (r in o.ranks) {
                    l = cards.length;
                    cards[l] = new playingCards.card(r, o.ranks[r], s, o.suits[s]);
                }
            }
            // jokers
            for (i = 0; i < o.jokers; i++) {
                l = this.cards.length;
                // suit will always be 1 or 2
                cards[l] = new playingCards.card("N", o.jokerText, (i % 2) + 1, '');
            }
        }
        return cards;
	}

	// playingCards.prototype.order (set to out-of-box ordering)
	// -- do we want other special formations (like trick deck ordering systems that deal perfect hands)?
	// -- probably going to leave this as an extension option
    /**
     * draw a card
	 * @return mixed (object|null) A card object (if a card is available)
     */
    var draw = function(cards) {
        return cards.length > 0 ? this.cards.pop() : null;
    };
    /**
	 * add a card to the top of the deck
	 */
   var addCard = function(cards) {
        cards.push(card);
    };

    /**
	 * get the number of cards remaining in the deck
	 * (easy enough just to call cardObject.cards.length but hey)
	 */
    var count = function(cards) {
        return cards.length;
    };

    /**
     * shuffle the deck
     *
     * @param int n The number of times to shuffle (defaults to 5)
     */
    var shuffle = function(n, cards) {
        if (!n) {
            n = 5;
        }
        var l = cards.length,
			r,tmp,i,j;

        for (i = 0; i < n; i++) {
            for (j = 0; j < l; j++) {
                r = Math.floor(Math.random() * l);
                tmp = this.cards[j];
                cards[j] = this.cards[r];
                cards[r] = tmp;
            }
        }
        return cards;
    };

    /**
     * create a playing card
     *
     * @param string rank The numeric or letter value of the card (short value)
     * @param string rankString The full text representation of the rank (localized)
     * @param string suit The letter value of the suite (short value)
     * @param string suitString The full text representation of the suit (localized)
     * @param obj conf Overriding configuration
     *
     * @return object The card object
     */
    playingCards.card = function(rank, rankString, suit, suitString, conf) {
        if (! (this instanceof playingCards.card)) {
            return new playingCards.card(rank, rankString, suit, suitString, conf);
        }

        if (suit === undefined) {
            //Arguments are rank, suit
            suit = rankString;
            rankString = playingCards.defaults.ranks[rank];
            suitString = playingCards.defaults.suits[suit];
        }

        this.rank = rank;
        this.rankString = rankString;
        this.suit = suit;
        this.suitString = suitString;
        return this;
    };