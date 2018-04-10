import { ApiService } from '../../utils/servicesApi';
@inject(ApiService)
export class MyDataServiceHold {
constructor(api) {
      this.api = api;
  }
  personList = [
    { 
      id: 0,
      firstName: "Rob",
      lastName: "Eisenberg",
      gender: "male",
      email: "rob@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Redmond",
      state: "washington",
      zip: "",
      orders: [
        {
          product: "Halo Wars",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 29.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 24.99
        }
      ]
    },
    { 
      id: 1,
      firstName: "Ashley",
      lastName: "Grant",
      gender: "male",
      email: "ashley@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Tallahassee",
      state: "florida",
      zip: "",
      orders: [
        {
          product: "BattleField 1",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 49.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 2,
      firstName: "Jeremy",
      lastName: "Danyow",
      gender: "male",
      email: "jeremy@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Redmond",
      state: "washington",
      zip: "",
      orders: [
        {
          product: "Call of Duty",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 49.99
        },
        {
          product: "Halo 5",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 29.99
        },
        {
          product: "Gears of War 4",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 49.99
        }
      ]
    },
    { 
      id: 3,
      firstName: "Scott",
      lastName: "Criswell",
      gender: "male",
      email: "scott@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Tallahassee",
      state: "florida",
      zip: "",
      orders: [
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        }
      ]
    },
    { 
      id: 4,
      firstName: "Martin",
      lastName: "Gustafsson",
      gender: "male",
      email: "martin@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Uddevalla",
      state: "sweden",
      zip: "",
      orders: [
        {
          product: "Star Wars Battlefront",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 39.99
        },
        {
          product: "Forza Horizon 3",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 42.99
        },
        {
          product: "Crackdown 3",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 59.99
        }
      ]
    },
    { 
      id: 5,
      firstName: "Patrick",
      lastName: "Robins",
      gender: "male",
      email: "patrick@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Chandler",
      state: "arizona",
      zip: "",
      orders: [
        {
          product: "Halo 5",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 39.99
        },
        {
          product: "Halo Wars",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        }
      ]
    },
    { 
      id: 6,
      firstName: "Bazyli",
      lastName: "Brzóska",
      gender: "male",
      email: "bazyli@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Krakow",
      state: "poland",
      zip: "",
      orders: [
        {
          product: "Halo",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 19.99
        },
        {
          product: "ReCore",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 7,
      firstName: "Patrick",
      lastName: "Walters",
      gender: "male",
      email: "patrick@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Dallas",
      state: "texas",
      zip: "",
      orders: [
        {
          product: "BattleField 1",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 49.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 8,
      firstName: "Andrew",
      lastName: "Stoker",
      gender: "male",
      email: "andrew@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Columbia",
      state: "south carolina",
      zip: "",
      orders: [
        {
          product: "Halo Wars",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 29.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 24.99
        }
      ]
    },
    { 
      id: 9,
      firstName: "Shuhel",
      lastName: "Ahmed",
      gender: "male",
      email: "shuhel@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Sylhet",
      state: "bangladesh",
      zip: "",
      orders: [
        {
          product: "BattleField 1",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 49.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 10,
      firstName: "Bryan",
      lastName: "Smith",
      gender: "male",
      email: "bryan@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Bellingham",
      state: "washington",
      zip: "",
      orders: [
        {
          product: "Halo 5",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 39.99
        },
        {
          product: "Halo Wars",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        }
      ]
    },
    { 
      id: 11,
      firstName: "Jedd",
      lastName: "Ahyoung",
      gender: "male",
      email: "jedd@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Seattle",
      state: "washington",
      zip: "",
      orders: [
        {
          product: "Star Wars Battlefront",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 39.99
        },
        {
          product: "Forza Horizon 3",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 42.99
        },
        {
          product: "Crackdown 3",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 59.99
        }
      ]
    },
    { 
      id: 12,
      firstName: "Strahil",
      lastName: "Kazlachev",
      gender: "male",
      email: "strahil@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Sofia",
      state: "bulgaria",
      zip: "",
      orders: [
        {
          product: "Halo",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 19.99
        },
        {
          product: "ReCore",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 13,
      firstName: "Jeroen",
      lastName: "Vinke",
      gender: "male",
      email: "jeroen@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Groningen Area",
      state: "netherlands",
      zip: "",
      orders: [
        {
          product: "Halo",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 19.99
        },
        {
          product: "ReCore",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 14,
      firstName: "Erik",
      lastName: "Lieben",
      gender: "male",
      email: "erik@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Netherlands",
      state: "amsterdam",
      zip: "",
      orders: [
        {
          product: "BattleField 1",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 49.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 15,
      firstName: "Matt",
      lastName: "Broadstone",
      gender: "male",
      email: "matt@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Brooklyn",
      state: "new york",
      zip: "",
      orders: [
        {
          product: "Halo 5",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 39.99
        },
        {
          product: "Halo Wars",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        }
      ]
    },
    { 
      id: 16,
      firstName: "Mike",
      lastName: "Graham",
      gender: "male",
      email: "mike@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Denver",
      state: "colorado",
      zip: "",
      orders: [
        {
          product: "Star Wars Battlefront",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 39.99
        },
        {
          product: "Forza Horizon 3",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 42.99
        },
        {
          product: "Crackdown 3",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 59.99
        }
      ]
    },
    { 
      id: 17,
      firstName: "Vildan",
      lastName: "Softic",
      gender: "male",
      email: "vildan@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Somewhere",
      state: "austria",
      zip: "",
       orders: [
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        }
      ]
   },
    { 
      id: 18,
      firstName: "Joel",
      lastName: "Dumas",
      gender: "male",
      email: "joel@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Somewhere",
      state: "arizona",
      zip: "",
      orders: [
        {
          product: "Call of Duty",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 49.99
        },
        {
          product: "Halo 5",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 29.99
        },
        {
          product: "Gears of War 4",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 49.99
        }
      ]
    },
    { 
      id: 19,
      firstName: "Meirion",
      lastName: "Hughes",
      gender: "male",
      email: "meirion@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Somewhere",
      state: "wales",
      zip: "",
      orders: [
        {
          product: "BattleField 1",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 49.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 2,
          unitPrice: 24.99
        },
        {
          product: "Gears of War",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 19.99
        }
      ]
    },
    { 
      id: 20,
      firstName: "Matthew",
      lastName: "James Davis",
      gender: "male",
      email: "matthew@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Sapporo",
      state: "japan",
      zip: "",
      orders: [
        {
          product: "Halo Wars",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 29.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 24.99
        }
      ]
    },
  ];
  genderList = [
    "male",
    "female"
  ];
  stateList = [
    {name: 'Alabama', value: 'alabama'},
    {name: 'Alaska', value: 'alaska'},
    {name: 'America Samoa', value: 'america samoa'},
    {name: 'Arizona', value: 'arizona'}, 
    {name: 'Arkansas', value: 'arkansas'},
    {name: 'California', value: 'california'},
    {name: 'Colorado', value: 'colorado'},
    {name: 'Connecticut', value: 'connecticut'},
    {name: 'Delaware', value: 'delaware'},
    {name: 'District of Columbia', value: 'district of columbia'},
    {name: 'Federated States of Micronesia', value: 'federated states of micronesia'},
    {name: 'Florida', value: 'florida'},
    {name: 'Georgia', value: 'georgia'},
    {name: 'Guam', value: 'guam'},
    {name: 'Hawaii', value: 'Hawaii'},
    {name: 'Idaho', value: 'idaho'},
    {name: 'Illinois', value: 'illinois'},
    {name: 'Indiana', value: 'indiana'},
    {name: 'Iowa', value: 'iowa'},
    {name: 'Kansas', value: 'kansas'},
    {name: 'Kentucky', value: 'kentucky'},
    {name: 'Louisiana', value: 'louisiana'},
    {name: 'Maine', value: 'maine'},
    {name: 'Marshall Islands', value: 'marshall islands'},
    {name: 'Maryland', value: 'maryland'},
    {name: 'Massachusetts', value: 'massachusetts'},
    {name: 'Michigan', value: 'michigan'},
    {name: 'Minnesota', value: 'minnesota'},
    {name: 'Mississippi', value: 'mississippi'},
    {name: 'Missouri', value: 'missouri'},
    {name: 'Montana', value: 'montana'},
    {name: 'Nebraska', value: 'nebraska'},
    {name: 'Nevada', value: 'nevada'},
    {name: 'New Hampshire', value: 'new hampshire'},
    {name: 'New Jersey', value: 'new jersey'},
    {name: 'New Mexico', value: 'new mexico'},
    {name: 'New York', value: 'new york'},
    {name: 'North Carolina', value: 'north carolina'},
    {name: 'North Dakota', value: 'north dakota'},
    {name: 'Northern Mariana Islands', value: 'northern mariana islands'},
    {name: 'Ohio', value: 'ohio'},
    {name: 'Oklahoma', value: 'oklahoma'},
    {name: 'Oregon', value: 'oregon'},
    {name: 'Palau', value: 'palau'},
    {name: 'Pennsylvania', value: 'Pennsylvania'},
    {name: 'Puerto Rico', value: 'puerto rico'},
    {name: 'Rhode Island', value: 'rhode island'},
    {name: 'South Carolina', value: 'south carolina'},
    {name: 'South Dakota', value: 'south dakota'},
    {name: 'Tennesee', value: 'tennesee'},
    {name: 'Texas', value: 'texas'},
    {name: 'Utah', value: 'utah'},
    {name: 'Vermont', value: 'vermont'},
    {name: 'Virgin Islands', value: 'virgin islands'},
    {name: 'Virginia', value: 'virginia'},
    {name: 'Washington', value: 'washington'},
    {name: 'West Virginia', value: 'west virginia'},
    {name: 'Wisconsin', value: 'wisconsin'},
    {name: 'Wyoming', value: 'wyoming'},
    {name: 'Sweden', value: 'sweden'},
    {name: 'Poland', value: 'poland'},
    {name: 'Bangladesh', value: 'bangladesh'},
    {name: 'Bulgaria', value: 'bulgaria'},
    {name: 'Netherlands', value: 'netherlands'},
    {name: 'Amsterdam', value: 'amsterdam'},
    {name: 'Austria', value: 'austria'},
    {name: 'Wales', value: 'wales'},
    {name: 'Japan', value: 'japan'},
  ];

  loadPeople() {
    return new Promise((resolve, reject) => {
      resolve(this.personList);
    });    
  }

  loadGenders() {
    return new Promise((resolve, reject) => {
      resolve(this.genderList);
    });
  }

  loadStates() {
    return new Promise((resolve, reject) => {
      resolve(this.stateList);
    });
  }

  camelCaseToProperCase(input) {
    return input.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }  
  
}