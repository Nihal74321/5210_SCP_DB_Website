function shortenWord(paragraph, limit) {
    const para_array = Array.from(paragraph.split(" "))
    let string_empty = ""
    if(para_array.length > limit) {
        for(let i = 0; i < para_array.length; i++){
            if(i < limit){
                if(i === limit -1){
                    string_empty += para_array[i]
                } else {
                    string_empty += para_array[i] + " "
               }
            }
        }
        string_empty += "..."
    } else {
        para_array.forEach((elem) => {
            string_empty += elem + " "
        })
    }
    return string_empty
}

const get_lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit soluta illum suscipit autem assumenda atque dignissimos tempore necessitatibus aperiam harum ratione quae voluptatem non, ex asperiores quod, rerum nobis placeat. Voluptatem quidem repellendus modi non placeat! Pariatur alias odit ratione. Quae praesentium accusamus enim, eos sint quo eligendi ipsa perferendis veritatis saepe quasi distinctio? Maiores itaque animi aut ex at. Veniam velit vitae optio quasi recusandae. Incidunt architecto unde dolorem libero, excepturi tempore tempora ut harum sequi repellat enim ipsa modi consequuntur, dicta voluptates eligendi reiciendis veritatis sit. Voluptatum, laborum. Impedit possimus itaque dolorum. Repellendus inventore corrupti odit nesciunt quos, nihil amet magnam exercitationem a, expedita praesentium quasi eos dolorum sunt voluptatibus facilis eius officiis deserunt asperiores excepturi ex nulla."


export { shortenWord }