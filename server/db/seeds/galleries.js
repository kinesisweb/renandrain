exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("galleries")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("galleries").insert([
        {
          gallery_id: 1,
          title: "Event Graphics",
          category: "event",
          path: "/default",
          description: ""
        },
        {
          gallery_id: 2,
          title: "Web Media",
          category: "webmedia",
          description: ""
        },
        {
          gallery_id: 3,
          title: "Symantha Vega",
          category: "brand",
          path: "/symanthavega",
          description: "Logo | Website | Tagline"
        },
        {
          gallery_id: 4,
          title: "S·P·A·C·E",
          category: "portrait",
          description: "",
          path: "/space",
          cols: 3,
          width: 300,
          height: 300
        },
        {
          gallery_id: 5,
          title: "Website Design",
          category: "website",
          description: ""
        },
        {
          gallery_id: 6,
          title: "One Pager",
          category: "onepager",
          description: ""
        },
        {
          gallery_id: 7,
          title: "Logo Design",
          category: "logo",
          description: ""
        },
        {
          gallery_id: 8,
          title: "Photography",
          category: "photography",
          description: "",
          cols: 4,
          width: 300,
          height: 200,
          path: "/default"
        }
      ]);
    });
};
