// SHERPA - Guide layer creator for After Effects.
// written by Sam Winkler - www.samwinkler.com - 2020

/*************************************************************************
	SETUP
*************************************************************************/

(function(thisObj) {

/*************************************************************************
  	BUILD UI PALETTE
*************************************************************************/

  buildUI(thisObj);
  function buildUI(thisObj) {

// SHERPAWINDOW
// ============
    sherpaWindow = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Sherpa",
      undefined, {resizeable: true});
    sherpaWindow.orientation = "row";
    sherpaWindow.alignChildren = ["center","top"];
    sherpaWindow.spacing = 10;
    sherpaWindow.margins = 16;
    sherpaWindow.resizeable = true;

// GROUP1
// ======
    group1 = sherpaWindow.add("group", undefined, {name: "group1"});
    group1.orientation = "column";
    group1.alignChildren = ["fill","center"];
    group1.spacing = 10;
    group1.margins = 0;

// GROUP2
// ======
    group2 = group1.add("group", undefined, {name: "group2"});
    group2.orientation = "row";
    group2.alignChildren = ["left","center"];
    group2.spacing = 10;
    group2.margins = 0;

// COLUMNS
// =======
    group8 = group2.add("panel", undefined, undefined, {name: "group8"});
    group8.text = "Columns";
    group8.preferredSize.width = 95;
    group8.orientation = "column";
    group8.alignChildren = ["center","center"];
    group8.spacing = 10;
    group8.margins = 10;

    columnsInput = group8.add('edittext {properties: {name: "columnsInput"}}');
    columnsInput.preferredSize.width = 60;

// ROWS
// ====
    group9 = group2.add("panel", undefined, undefined, {name: "group9"});
    group9.text = "Rows";
    group9.preferredSize.width = 95;
    group9.orientation = "column";
    group9.alignChildren = ["center","top"];
    group9.spacing = 10;
    group9.margins = 10;

    rowsInput = group9.add('edittext {properties: {name: "rowsInput"}}');
    rowsInput.preferredSize.width = 60;

// PANEL1
// ======
    panel1 = group1.add("panel", undefined, undefined, {name: "panel1"});
    panel1.text = "Margins ( % )";
    panel1.orientation = "column";
    panel1.alignChildren = ["center","top"];
    panel1.spacing = 10;
    panel1.margins = [15,15,15,15];

// GROUP3
// ======
    group3 = panel1.add("group", undefined, {name: "group3"});
    group3.orientation = "row";
    group3.alignChildren = ["left","center"];
    group3.spacing = 20;
    group3.margins = 0;

// GROUP4
// ======
    group4 = group3.add("group", undefined, {name: "group4"});
    group4.preferredSize.width = 60;
    group4.orientation = "column";
    group4.alignChildren = ["left","center"];
    group4.spacing = 5;
    group4.margins = 0;

    statictext1 = group4.add("statictext", undefined, undefined, {name: "statictext1"});
    statictext1.text = "Top:";

    topMarginInput = group4.add('edittext {properties: {name: "topMarginInput"}}');
    topMarginInput.preferredSize.width = 60;

// GROUP5
// ======
    group5 = group3.add("group", undefined, {name: "group5"});
    group5.preferredSize.width = 60;
    group5.orientation = "column";
    group5.alignChildren = ["left","center"];
    group5.spacing = 5;
    group5.margins = 0;

    statictext2 = group5.add("statictext", undefined, undefined, {name: "statictext2"});
    statictext2.text = "Left:";

    leftMarginInput = group5.add('edittext {properties: {name: "leftMarginInput"}}');
    leftMarginInput.preferredSize.width = 60;

// GROUP6
// ======
    group6 = panel1.add("group", undefined, {name: "group6"});
    group6.orientation = "row";
    group6.alignChildren = ["left","center"];
    group6.spacing = 20;
    group6.margins = 0;

// GROUP7
// ======
    group7 = group6.add("group", undefined, {name: "group7"});
    group7.preferredSize.width = 60;
    group7.orientation = "column";
    group7.alignChildren = ["left","center"];
    group7.spacing = 5;
    group7.margins = 0;

    statictext3 = group7.add("statictext", undefined, undefined, {name: "statictext3"});
    statictext3.text = "Bottom:";

    bottomMarginInput = group7.add('edittext {properties: {name: "bottomMarginInput"}}');
    bottomMarginInput.preferredSize.width = 60;

// GROUP8
// ======
    group8 = group6.add("group", undefined, {name: "group8"});
    group8.preferredSize.width = 60;
    group8.orientation = "column";
    group8.alignChildren = ["left","center"];
    group8.spacing = 5;
    group8.margins = 0;

    statictext4 = group8.add("statictext", undefined, undefined, {name: "statictext4"});
    statictext4.text = "Right:";

    rightMarginInput = group8.add('edittext {properties: {name: "rightMarginInput"}}');
    rightMarginInput.preferredSize.width = 60;

// GROUP1
// ======
    clearGuidesCheckbox = group1.add("checkbox", undefined, undefined, {name: "clearGuidesCheckbox"});
    clearGuidesCheckbox.text = "Clear Existing Guides";

    okButton = group1.add("button", undefined, undefined, {name: "okButton"});
    okButton.text = "Create Guides";
    okButton.preferredSize.width = 75;

    sherpaWindow.onResizing = sherpaWindow.onResize = function() {
      this.layout.resize();
    };
    if (sherpaWindow instanceof Window) {
      sherpaWindow.center();
        sherpaWindow.show();
    } else {
      sherpaWindow.layout.layout(true);
      sherpaWindow.layout.resize();
    }
  }
})(this);

/*************************************************************************
	EVENT HANDLING
*************************************************************************/

okButton.onClick =  function okButtonClick() {
	myComp = app.project.activeItem;
	if (myComp != null && myComp instanceof CompItem) {

    columns = columnsInput.text;
    rows = rowsInput.text;
    topMargin = topMarginInput.text;
    leftMargin = leftMarginInput.text;
    bottomMargin = bottomMarginInput.text;
    rightMargin = rightMarginInput.text;

    app.activeViewer.views[0].options.guidesVisibility = true;

    if (clearGuidesCheckbox.value == true) {
      while (myComp.guides.length > 0) {
        myComp.removeGuide(0);
      }
    }

    if(!isNaN(columns) && columns >= 2) {
      columns = Math.round(columns);
      for (x = 1; x < columns; x++) {
        columnPositions = x * (myComp.width / columns);
        myComp.addGuide(1, columnPositions);
      }
    }

    if(!isNaN(rows) && rows >= 2) {
      columns = Math.round(rows);

      for (x = 1; x < rows; x++) {
        rowPositions = x * (myComp.height / rows);
        myComp.addGuide(0, rowPositions);
      }
    }

    if(!isNaN(topMargin) && topMargin >= 1) {
      myComp.addGuide(0, myComp.height * (topMargin / 100));
    }

    if(!isNaN(bottomMargin) && bottomMargin >= 1) {

      myComp.addGuide(0, myComp.height * (1 -(bottomMargin / 100)));
    }

    if(!isNaN(leftMargin) && leftMargin >= 1) {
      myComp.addGuide(1, myComp.width * (leftMargin / 100));
    }

    if(!isNaN(rightMargin) && rightMargin >= 1) {
      myComp.addGuide(1, myComp.width * (1 - (rightMargin / 100)));
    }
	} else {alert("No comp selected!")}
}
