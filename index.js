//todo display imoji list  on this function
function displayResults(searchQuery=""){

    //todo filterout our entire imojilist according to search
    let filterdEmojiList = emojiList .filter((item)=>{
        searchQuery = searchQuery?.toLowerCase();
        let originQueryAccordingDescription = item.description.toLowerCase();
        let originQueryAccordingAliases = item.aliases.join(",").replaceAll("_"," ").toLowerCase();

        //filter according tags
        if(item.tags.some((el)=>el?.toLowerCase().startsWith(searchQuery))){
            return true;
        }
        // filter according to description
        if(originQueryAccordingDescription.indexOf(searchQuery)!=-1){
            return true;
        }
        
        // filter according to aliases
        if(originQueryAccordingAliases.indexOf(searchQuery) != -1){
            return true;
        }
        
    })

    console.log(filterdEmojiList);
    let parentTable = document.getElementById("search_result_container");
    parentTable.innerHTML = "";

    //iterate on emojilist and print on our html
    filterdEmojiList.forEach((item)=>{
        // create row for every element
        let new_row = document.createElement("tr");
        new_row.classList.add("allRow");
        //three column
        let new_emoji = document.createElement("td");
        let new_aliases = document.createElement("td");
        let new_description = document.createElement("td");

        //add classlist to td
        new_emoji.classList.add("emoji");
        new_aliases.classList.add("aliases");
        new_description.classList.add("description");

        //add data in every element
        new_emoji.innerText = item.emoji;
        new_aliases.innerText = item.aliases.join(",");
        new_description.innerText = item.description;
        
        new_aliases.innerText = new_aliases.innerText.replaceAll("_"," ");
        //append all td to rows
        new_row.appendChild(new_emoji);
        new_row.appendChild(new_aliases);
        new_row.appendChild(new_description);

        //append row to table
        parentTable.appendChild(new_row);
    })

}

//todo load our windoe then show our imoji list
window.onload = ()=> displayResults();

// <------------------Search bar functionality---------------------------------------------------------->

//todo autosuggestion callback function for serach searchbar value
function autoSuggestion(e){
    displayResults(e.target.value);
}

//todo fetch data from input tag(search bar)
let searchValue = document.querySelector("input");
searchValue.addEventListener("keyup",autoSuggestion);