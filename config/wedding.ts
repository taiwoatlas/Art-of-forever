export const wedding = {
  bride: "Adesewa Olanrewaju", groom: "Kamsiyochukwu Ibe",
  signature: "Adesewa & Kamsiyochukwu", monogram: "A | K",
  motto: "Two Hearts. One Promise. A Lifetime of Forever.",
  brideParents: "Mr. and Mrs. Babatunde Olanrewaju", groomParents: "Mr. and Mrs. Emeka Ibe",
  timezone: "Africa/Lagos", rsvpDeadline: "1 December 2026",
  countdownTarget: "2026-12-19T11:00:00+01:00", // Lagos = UTC+1, no DST
  colors: { ivory:"#F7F2E9", pearl:"#FFFEFA", champagne:"#D6BC91", gold:"#B4935F", emerald:"#667D69", rose:"#DCC4BD", espresso:"#382C25", charcoal:"#45403A" },
  events: [
    { key:"traditional", date:"FRIDAY, 18 DECEMBER 2026", title:"THE TRADITIONAL ENGAGEMENT", tagline:"A celebration of family, heritage, culture and love.", time:"4:00 PM", venue:"The Jewel Aeida", address:"105 Hakeem Dickson Link Road, Lekki Phase I, Lagos, Nigeria", dress:"Elegant traditional attire", extra:"Aso Ebi colours: Emerald green and antique gold" },
    { key:"white", date:"SATURDAY, 19 DECEMBER 2026", title:"THE WHITE WEDDING", tagline:"A celebration of love, commitment and a lifetime together.", time:"11:00 AM", venue:"The Civic Centre", address:"Ozumba Mbadiwe Avenue, opposite 1004 Estate, Victoria Island, Lagos, Nigeria", dress:"Elegant formal attire", extra:"Today, we choose forever." },
    { key:"reception", date:"SATURDAY, 19 DECEMBER 2026", title:"THE WEDDING RECEPTION", tagline:"Join us as we celebrate the beginning of forever.", time:"3:00 PM", venue:"Eko Hotel & Suites — Grand Ballroom", address:"Plot 1415 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria", dress:"Elegant formal attire", extra:"" },
  ],
  story: ["Every beautiful story begins somewhere.","In 2019, two lives crossed paths at a friend's graduation dinner.","What began as a simple conversation gradually became a friendship.","Through shared dreams, countless conversations and unexpected moments, something extraordinary began to grow.","With time, friendship became love.","And love became a promise.","Today, with the blessing of our families, we are ready to begin forever."],
  letter: ["To everyone who has been part of our journey,","We have come to understand that the most beautiful moments in life become even more meaningful when shared with the people we love.","Your encouragement, kindness, prayers and presence have made our journey special.","As we prepare to begin this new chapter, we would be honoured to celebrate with you.","Thank you for being part of our story.","With love,","Adesewa & Kamsiyochukwu."],
  accept: "Your response has been received.\n\nWe are delighted to celebrate this beautiful occasion with you.\n\nWith love,\nAdesewa & Kamsiyochukwu.",
  decline: "Thank you for letting us know.\n\nAlthough we may not have the pleasure of celebrating together in person, we appreciate your kind wishes and are grateful to have you as part of our story.\n\nWith love,\nAdesewa & Kamsiyochukwu.",
};
export const mapsUrl = (a: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a)}`;
