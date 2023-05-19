import image1 from '../../public/product1.png';
import image2 from '../../public/product2.png';
import image3 from '../../public/product3.png';


export const mainMenu = [
    {
        name:"chemia i kosmetyki",
        url:"/kategorie/chemia-i-kosmetyki",
        subcategories: [
            {
                name:'Papiery toaletowe',
                url:"aa"
            },
            {
                name:'pielęgnacja ciała',
                url:"aa"
            },
            {
                name:'środki czyszczące',
                url:"aa"
            },
            {
                name:"środki piorące",
                url:"aa"
            }
        ]
    },
    {
        name:"dla zwierząt",
        url:"/kategorie/chemia-i-kosmetyki"
    },
    {
        name:"dziecięce",
        url:"/kategorie/dzieciece",
        subcategories: [
            {
                name:'spożywcze',
                url:"aa",
                categories: [
                    {
                        name:"kaszki",
                        url:"/kategorie/dzieciece/kaszki"
                    },
                    {
                        name:"napoje",
                        url:"/kategorie/dzieciece/napoje"
                    },
                    {
                        name:"desery",
                        url:"/kategorie/dzieciece/desery"
                    },
                    {
                        name:"obiadki",
                        url:"/kategorie/dzieciece/obiadki"
                    }
                ]
            }
        ]
    },
    {
        name:"kawy i herbaty",
        url:"/kategorie/chemia-i-kosmetyki",
        subcategories: [
            {
                name:"dodatki do kawy",
                url:"aaa"
            },
            {
                name:'herbaty',
                url:"aa",
                categories: [
                    {
                        name:"czarne",
                        url:"/kategorie/dzieciece/kaszki"
                    },
                    {
                        name:"inne",
                        url:"/kategorie/dzieciece/napoje"
                    },
                    {
                        name:"owocowe",
                        url:"/kategorie/dzieciece/desery"
                    },
                    {
                        name:"ziołowe",
                        url:"/kategorie/dzieciece/obiadki"
                    }
                ]
            },
            {
                name:"inne",
                url:"aa",
                categories:[
                    {
                        name:"czekolady",
                        url:"/kategorie/dzieciece/kaszki"
                    },
                    {
                        name:"kakao",
                        url:"/kategorie/dzieciece/kaszki"
                    }
                ]
            },
            {
                name:'kawy',
                url:"aa",
                categories: [
                    {
                        name:"cappuccino",
                        url:"/kategorie/dzieciece/kaszki"
                    },
                    {
                        name:"mielone",
                        url:"/kategorie/dzieciece/napoje"
                    },
                    {
                        name:"rozpuszczalne",
                        url:"/kategorie/dzieciece/desery"
                    },
                    {
                        name:"zbożowe",
                        url:"/kategorie/dzieciece/obiadki"
                    },
                    {
                        name:"ziarniste",
                        url:"/kategorie/dzieciece/obiadki"
                    }
                ]
            },
        ]
    },
    {
        name:"piwo",
        url:"/kategorie/chemia-i-kosmetyki"
    },
    {
        name:"spożywcze",
        url:"/kategorie/chemia-i-kosmetyki"
    },
    {
        name:"słodycze i przekąski",
        url:"/kategorie/chemia-i-kosmetyki"
    },
    {
        name:"warzywa i owoce",
        url:"/kategorie/chemia-i-kosmetyki"
    },
    {
        name:"wody i napoje",
        url:"/kategorie/chemia-i-kosmetyki"
    }

]




export const products = [
    {
        name: "Sibille Chusteczki Uniwersalne 150 sztuk",
        producent:"sibille",
        weight: 0,
        weightUnit: "g",
        pricePer: 14.95,
        priceUnit:"kg",
        singlePrice: 4.87,
        taxPrice: 5.99,
        available:true,
        image: image1,
        link:"/sibille-chusteczki"
    },
    {
        name: "NIVEA Krem uniwersalny",
        producent:"nivea",
        weight: 120,
        weightUnit: "g",
        pricePer: 24.15,
        priceUnit:"kg",
        singlePrice: 8.87,
        taxPrice: 9.99,
        available:false,
        image: image2,
        link:"/nivea-krem-universalny"
    },
    {
        name: "Velvet delikatnie biały",
        producent:"nivea",
        weight: 1400,
        weightUnit: "g",
        pricePer: 44.15,
        priceUnit:"kg",
        singlePrice: 18.27,
        taxPrice: 19.99,
        available:true,
        image:image3,
        link:"/velvet-delikatnie-bialy"
    }
]