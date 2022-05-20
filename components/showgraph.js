import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { View, Text, StyleSheet } from 'react-native'
import { chartColors } from "./colors";
import { Chart, ArcElement, Title, Legend, LinearScale,CategoryScale, BarElement } from 'chart.js'
import ChartDataLabels from "chartjs-plugin-datalabels"

Chart.register(
    ArcElement,
    Title,
    Legend,
    LinearScale,
    ChartDataLabels,
    CategoryScale,
    BarElement
    )

const dummycosts = [30,40,400,2,472,31,7]

export function DailyDoughnut () {
    let stuff = ["transportation", "food", "accomadations", "other"]

    const data_ = {
        maintainAspectRatio: false,
        responsive: true,
        labels: stuff,
        datasets: [
            {
            data: dummycosts.slice(0,4), //costs.slice(0,4)
            backgroundColor: chartColors,
            borderColor: chartColors,
            borderWidth: 1
            }
        ]
    }
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Today's Spending"
            },
            datalabels: {
                display: true,
                color: "black",
                align: "bottom",
                font: {
                    size: 16
                }
            }
        }
    }
    return (
        <View style={styles.piecontainer}>
        <Text style={styles.value}>Total: ${dummycosts[4]} CAD</Text>
            <Pie data = {data_} options={options_}/>
        </View>
    )
}

const dummyoverall = 
[
    [1,2,3,4,10,5,6], //transporation
    [2,3,4,5,10,6,6], //accomadation
    [3,4,5,6,10,7,6], //food
    [5,6,7,8,9,10,11], //other
    [10,10,10,10,10,10,10], //total
    [1,2,3,4,5,6,7], //date
    [5,5,5,5,5,5,5] //month
]

export function OverallBar () { //costs
    const datetime = []
    const costs = dummyoverall
    for (let i=0;i<costs.length;i++) {
        datetime.push(String(costs[5][i])+'/'+String(costs[6][i])+'/2022')
    }

    console.log(datetime)

    const options_ = {
        plugins: {
            title: {
                display: true,
                text: 'Overall Spending'
            },
            datalabels: {
                display: false
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    }
    const labels = datetime
    const data_ = {
        labels,
        datasets: [
            {
                label: 'Transporation',
                data: costs[0],
                backgroundColor: chartColors[0]
            },
            {
                label: 'Accomadation',
                data: costs[1],
                backgroundColor: chartColors[1]
            },
            {
                label: 'Food',
                data: costs[2],
                backgroundColor: chartColors[2]
            },
            {
                label: 'Other',
                data: costs[3],
                backgroundColor: chartColors[3]
            }
        ]
    }

    return (
        <View style={styles.piecontainer}>
        <Text style={styles.value}>Total: ${costs[4].reduce((partialsum,a) => partialsum+a,0)} CAD</Text>
            <Bar data = {data_} options={options_}/>
        </View>
    )
}


const styles = StyleSheet.create({
    piecontainer: {
        width: "30%",
        height: "30%",
        top: "50%",
        left: "50%",
        position: "absolute",
        color: "black"
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 15,
        paddingLeft: "40%"
    }
})