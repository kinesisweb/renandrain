exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("gallery_images")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("gallery_images").insert([
        {
          image_id: 1,
          caption: "",
          gallery_id: 8,
          filename: "1",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 2,
          caption: "",
          gallery_id: 8,
          filename: "2",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 3,
          caption: "",
          gallery_id: 8,
          filename: "3",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 4,
          caption: "",
          gallery_id: 8,
          filename: "4",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 5,
          caption: "",
          gallery_id: 8,
          filename: "5",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 6,
          caption: "",
          gallery_id: 8,
          filename: "6",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 7,
          caption: "",
          gallery_id: 8,
          filename: "7",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 8,
          caption: "",
          gallery_id: 8,
          filename: "8",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 9,
          caption: "",
          gallery_id: 8,
          filename: "9",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 10,
          caption: "",
          gallery_id: 8,
          filename: "10",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 11,
          caption: "",
          gallery_id: 8,
          filename: "11",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 12,
          caption: "",
          gallery_id: 8,
          filename: "12",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 13,
          caption: "",
          gallery_id: 8,
          filename: "13",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 14,
          caption: "",
          gallery_id: 8,
          filename: "14",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 15,
          caption: "",
          gallery_id: 8,
          filename: "15",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 16,
          caption: "",
          gallery_id: 8,
          filename: "16",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 17,
          caption: "",
          gallery_id: 8,
          filename: "17",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },

        {
          image_id: 18,
          caption: "",
          gallery_id: 4,
          filename: "1",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 19,
          caption: "",
          gallery_id: 4,
          filename: "2",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 20,
          caption: "",
          gallery_id: 4,
          filename: "3",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 21,
          caption: "",
          gallery_id: 4,
          filename: "4",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 22,
          caption: "",
          gallery_id: 4,
          filename: "5",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 23,
          caption: "",
          gallery_id: 4,
          filename: "6",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 24,
          caption: "",
          gallery_id: 4,
          filename: "7",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 25,
          caption: "",
          gallery_id: 4,
          filename: "8",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 26,
          caption: "",
          gallery_id: 4,
          filename: "9",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 27,
          caption: "",
          gallery_id: 4,
          filename: "10",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 28,
          caption: "",
          gallery_id: 4,
          filename: "11",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },
        {
          image_id: 29,
          caption: "",
          gallery_id: 4,
          filename: "12",
          file_type: "jpg",
          file_size: 0,
          cols: null
        },

        {
          image_id: 30,
          caption: "",
          gallery_id: 1,
          filename: "1",
          file_type: "gif",
          file_size: 0,
          cols: 4
        },
        {
          image_id: 31,
          caption: "",
          gallery_id: 1,
          filename: "2",
          file_type: "png",
          file_size: 0,
          cols: 8
        },
        {
          image_id: 32,
          caption: "",
          gallery_id: 1,
          filename: "3",
          file_type: "png",
          file_size: 0,
          cols: 8
        },
        {
          image_id: 33,
          caption: "",
          gallery_id: 1,
          filename: "4",
          file_type: "png",
          file_size: 0,
          cols: 4
        },
        {
          image_id: 34,
          caption: "",
          gallery_id: 1,
          filename: "5",
          file_type: "png",
          file_size: 0,
          cols: 4
        },
        {
          image_id: 35,
          caption: "",
          gallery_id: 1,
          filename: "6",
          file_type: "png",
          file_size: 0,
          cols: 8
        },
        {
          image_id: 36,
          caption: "",
          gallery_id: 1,
          filename: "7",
          file_type: "png",
          file_size: 0,
          cols: 8
        },
        {
          image_id: 37,
          caption: "",
          gallery_id: 1,
          filename: "8",
          file_type: "png",
          file_size: 0,
          cols: 4
        },
        {
          image_id: 38,
          caption: "",
          gallery_id: 1,
          filename: "9",
          file_type: "png",
          file_size: 0,
          cols: 10
        },

        {
          image_id: 39,
          caption: "",
          gallery_id: 3,
          filename: "logo",
          file_type: "png",
          file_size: 0,
          cols: null,
          outline: true,
          contain: true
        },
        {
          image_id: 40,
          caption: "",
          gallery_id: 3,
          filename: "website",
          file_type: "png",
          file_size: 0,
          cols: null
        },
        {
          image_id: 41,
          caption: "",
          gallery_id: 3,
          filename: "tagline",
          file_type: "png",
          file_size: 0,
          cols: null,
          outline: true,
          contain: true
        }
      ]);
    });
};
