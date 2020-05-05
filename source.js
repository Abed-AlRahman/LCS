//console.log(LCS("ass like that","The way you move it"))

function fillRow(new_row, l1, r) {
    for (let i = 0; i <= l1; i++) {
        let new_square = document.createElement("div");
        new_square.className = "box";
        new_square.id = "box" + r + "_" + i;

        let new_inner = document.createElement("div");
        new_inner.className = "inner";
        new_inner.id = "inner" + r + "_" + i;

        new_square.appendChild(new_inner)

        new_row.appendChild(new_square);
    }
}

function LCS() {
    var old_rows = document.getElementsByClassName("row")
    while (old_rows.length > 0) {
        old_rows[0].remove()
    }
    var text1 = document.getElementById("text1").value
    var text2 = document.getElementById("text2").value
    var l1 = text1.length
    var l2 = text2.length
    // finding their lengths
    console.log(`${text1} length is ${l1} and ${text2} len is ${l2}`)
    if (l1 == 0 || l2 == 0) {
        console.log(Math.abs(l1 - l2))
        return 0;
    }//If a string is empty then we return the numbre of letters in the other one

    var DP_table = new Array(l2 + 1);

    for (var i = 0; i < DP_table.length; i++) {
        var new_row = document.createElement("div");
        new_row.className = "row";
        new_row.id = "row" + i;
        document.getElementById("grid").appendChild(new_row)
        fillRow(new_row, l1, i)
        DP_table[i] = new Array(l1 + 1);
    }


    DP_table[0][0] = 0;
    document.getElementById("inner0_0").innerHTML = "0";
    //Converting a space to space needs no operations

    for (var x = 1; x <= l1; x++) {
        DP_table[0][x] = 0;
        console.log(x)
        document.getElementById(`inner0_${x}`).innerHTML = "0";
    }
    //Filling the first row with number of opeartions needed to convert to space
    for (var x = 1; x <= l2; x++) {
        DP_table[x][0] = 0;
        document.getElementById(`inner${x}_0`).innerHTML = "0";
    }
    //Filling the first column with number of operations needed to fill the space with letters

    for (var i = 1; i <= l2; i++) {
        for (var j = 1; j <= l1; j++) {

            if (text1[j - 1] == text2[i - 1]) {
                DP_table[i][j] = DP_table[i - 1][j - 1] + 1;
            }
            else {
                DP_table[i][j] = Math.max(DP_table[i - 1][j], DP_table[i][j - 1]);
            }

            document.getElementById(`inner${i}_${j}`).innerHTML = DP_table[i][j];
        }
    }

    console.log(DP_table)

    var answer = ""

    var i = l2, j = l1 ;

    while(i>=0&&j>=0){

        document.getElementById(`box${i}_${j}`).style["backgroundColor"] = "gray";
        if(i==0||j==0)
            break;
        if(DP_table[i][j] != Math.max(DP_table[i - 1][j], DP_table[i][j - 1])){
            answer=text1[j-1]+answer;
            i--;
            j--;
        }
        else{
            if(DP_table[i][j] == DP_table[i-1][j]){
                i--;
            }
            else{
                j--;
            }
        }
    }
    console.log(answer)
    document.getElementById("result").innerHTML=answer;

    return DP_table[l2][l1];
}