import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'food',
    title: 'Food',
    type: 'document',
    fields: [
        defineField({
            name: 'product',
            title: 'Product Name',
            type: 'string',
        }),
        defineField({
            name: 'foodID',
            title: 'Food ID',
            type: 'string',
        }),
        defineField({
            name: 'foodCategory',
            title: 'Food Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Fruit And Veg', value: 'FruitAndVeg' },
                    { title: 'Cupboard', value: 'Cupboard' },
                    { title: 'Bread', value: 'Bread' },
                    { title: 'Dairy And Eggs', value: 'DairyAndEggs' },
                    { title: 'Poultry And Fish', value: 'PoultryAndFish' },
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
            options: {
                lists: [
                    { title: 'GBP', value: '£'},
                ]
            }
        }),
        defineField({
            name: 'quantity',
            title: 'Quanitity',
            type: 'string',
        }),
        defineField({
            name: 'useBy',
            title: 'Use By Date',
            type: 'string',
            format: 'DD/MM/YYYY'
        }),
    ],
})