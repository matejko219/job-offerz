import {Component, OnInit} from '@angular/core';
import {Offer} from "../../models/offer";
import {Category} from "../../models/category";

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  addedLabel = 'Dodane';
  favoriteLabel = 'Ulubione';

  categories: Category[] = [
    {
      _id: '1',
      name: 'Frontend'
    },
    {
      _id: '2',
      name: 'Backend'
    }
  ];

  offers: Offer[] = [];
  front: Offer[] = [
    {
      _id: '1',
      position: 'Senior frontend developer (Angular4)',
      company: {_id: '1', name: 'Comarch S.A.', logo: ''},
      category: {_id: '1', name: 'Frontend'},
      location: 'Rzeszów',
      offerDetails: {
        description: '',
        requirements: [],
        terms: {
          formOfEmployment: '',
          jobTime: 100,
          salary: {
            amount: 1,
            currency: '',
            type: '',
            period: ''
          }
        },
        bonuses: [],
        contactDetails: {
          phone: '',
          email: '',
          www: ''
        }
      },
      createDate: new Date(2017, 9, 28)
    },
    {
      _id: '2',
      position: 'Junior frontend developer (React.js)',
      company: {_id: '1', name: 'PGS Software', logo: ''},
      category: {_id: '1', name: 'Frontend'},
      location: 'Rzeszów',
      offerDetails: {
        description: '',
        requirements: [],
        terms: {
          formOfEmployment: '',
          jobTime: 100,
          salary: {
            amount: 1,
            currency: '',
            type: '',
            period: ''
          }
        },
        bonuses: [],
        contactDetails: {
          phone: '',
          email: '',
          www: ''
        }
      },
      createDate: new Date(2017, 8, 22)
    },
    {
      _id: '3',
      position: 'Frontend developer (Vue.js)',
      company: {_id: '1', name: 'Ailleron S.A.', logo: ''},
      category: {_id: '1', name: 'Frontend'},
      location: 'Rzeszów',
      offerDetails: {
        description: '',
        requirements: [],
        terms: {
          formOfEmployment: '',
          jobTime: 100,
          salary: {
            amount: 1,
            currency: '',
            type: '',
            period: ''
          }
        },
        bonuses: [],
        contactDetails: {
          phone: '',
          email: '',
          www: ''
        }
      },
      createDate: new Date(2017, 6, 12)
    },
  ];

  back: Offer[] = [
    {
      _id: '4',
      position: 'Senior Java developer',
      company: {_id: '1', name: 'Comarch S.A.', logo: ''},
      category: {_id: '1', name: 'Backend'},
      location: 'Rzeszów',
      offerDetails: {
        description: '',
        requirements: [],
        terms: {
          formOfEmployment: '',
          jobTime: 100,
          salary: {
            amount: 1,
            currency: '',
            type: '',
            period: ''
          }
        },
        bonuses: [],
        contactDetails: {
          phone: '',
          email: '',
          www: ''
        }
      },
      createDate: new Date(2017, 9, 23)
    },
    {
      _id: '5',
      position: 'Junior Scala developer',
      company: {_id: '1', name: 'Comarch S.A.', logo: ''},
      category: {_id: '1', name: 'Backend'},
      location: 'Rzeszów',
      offerDetails: {
        description: '',
        requirements: [],
        terms: {
          formOfEmployment: '',
          jobTime: 100,
          salary: {
            amount: 1,
            currency: '',
            type: '',
            period: ''
          }
        },
        bonuses: [],
        contactDetails: {
          phone: '',
          email: '',
          www: ''
        }
      },
      createDate: new Date(2017, 5, 18)
    },
    {
      _id: '6',
      position: 'Python developer',
      company: {_id: '1', name: 'PGS Software', logo: ''},
      category: {_id: '1', name: 'Backend'},
      location: 'Rzeszów',
      offerDetails: {
        description: '',
        requirements: [],
        terms: {
          formOfEmployment: '',
          jobTime: 100,
          salary: {
            amount: 1,
            currency: '',
            type: '',
            period: ''
          }
        },
        bonuses: [],
        contactDetails: {
          phone: '',
          email: '',
          www: ''
        }
      },
      createDate: new Date(2017, 4, 16)
    },
  ];

  constructor() {
  }

  ngOnInit() {
    this.offers = this.front;
  }

  selectedIndexChange(tabIndex) {
    if (tabIndex === 0) this.offers = this.front;
    else this.offers = this.back;
  }

}
