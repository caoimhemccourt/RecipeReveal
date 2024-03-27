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
                    { title: 'Fruit And Veg', value: 'fruitAndVeg' },
                    { title: 'Cupboard', value: 'cupboard' },
                    { title: 'Bread', value: 'bread' },
                    { title: 'Dairy And Eggs', value: 'dairyAndEggs' },
                    { title: 'Poultry And Fish', value: 'poultryAndFish' },
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'quantity',
            title: 'Quanitity',
            type: 'number',
        }),
        defineField({
            name: 'useBy',
            title: 'Use By Date',
            type: 'datetime',
        }),
    ],
})