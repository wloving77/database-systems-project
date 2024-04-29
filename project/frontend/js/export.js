async function exportUserInfo() {
    const url = "http://localhost:3000/classes/get/" + user;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { classCount, classes } = await response.json();

      var jsonData = JSON.stringify(classes, null, 2);

        var blob = new Blob([jsonData], { type: 'application/json' });

        // Create a temporary anchor element
        var downloadAnchorNode = document.createElement('a');
        
        downloadAnchorNode.href = window.URL.createObjectURL(blob);
        downloadAnchorNode.download = 'user_info.json'; // Default filename
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        document.body.removeChild(downloadAnchorNode);


   

    }
    
    
    catch (error) {
        console.error(`Error exporting Classes ${error}`);
    }

}