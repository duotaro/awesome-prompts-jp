export function kmgt (num) {
    if (num > 0 ){
        if (num < 1000)             { return num }
        if (num < 1000000)          { return (num/1000) + "K" }
        if (num < 1000000000)       { return (num/1000/1000) + "M" }
        if (num < 1000000000000)    { return (num/1000/1000/1000) + "G" }

        return (num/1000/1000/1000/1000) + "T"
    }
    return num
}