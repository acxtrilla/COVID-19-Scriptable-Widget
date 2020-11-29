// change "COUNTRY" to a value from https://coronavirus-19-api.herokuapp.com/countries/
const COUNTRY = "UK"

const API__URL = `https://coronavirus-19-api.herokuapp.com/countries/${COUNTRY}`
const API__REQ = new Request(API__URL)
const API__RES = await API__REQ.loadJSON()

const TEXT__TITLE = { default: `🦠 COVID Statistics for ${COUNTRY}`, smallWidget: "🦠 COVID Stats" }
const TEXT__TOTAL_CASES = "Total Cases"
const TEXT__CASES_TODAY = "Cases Today"
const TEXT__TOTAL_DEATHS = "Total Deaths"
const TEXT__RECOVERED = "Recovered"
const TEXT__CRITICAL = "Critical"

const STAT__TOTAL_CASES = `${API__RES.cases}`
const STAT__CASES_TODAY = `${API__RES.todayCases}`
const STAT__TOTAL_DEATHS = `${API__RES.deaths}`
const STAT__RECOVERED = `${API__RES.recovered}`
const STAT__CRITICAL = `${API__RES.critical}`

const SIRI_TEXT = `There are ${STAT__TOTAL_CASES} cases in ${COUNTRY}, and ${STAT__CASES_TODAY} new cases registered today.`

const FONT__TITLE_TEXT = { COLOR: Color.white(), FAMILY: 'ArialRoundedMTBold', SIZE: 16, OPACITY: 1 }
const FONT__STAT_TEXT = { COLOR: Color.white(), FAMILY: 'ArialRoundedMT', SIZE: 20, OPACITY: 0.95 }
const FONT__NAME_TEXT = { COLOR: Color.white(), FAMILY: 'ArialRoundedMTBold', SIZE: 12, OPACITY: 0.5 }


if (true || config.runsInWidget) {
  let widget = createWidget()

  widget.presentSmall()
  Script.setWidget(widget)
  Script.complete()
} else {
  let table = createStatTable()

  if (config.runsWithSiri) {
    Speech.speak(SIRI_TEXT)
  }

  //   table.present(true)
}

function createStatTable() {
  let table = new UITable()

  table.showSeparators = true

  table.addRow(createStatHeaderRow(TEXT__TITLE.default))
  table.addRow(createStatRow(TEXT__TOTAL_CASES, STAT__TOTAL_CASES))
  table.addRow(createStatRow(TEXT__CASES_TODAY, STAT__CASES_TODAY))
  table.addRow(createStatRow(TEXT__TOTAL_DEATHS, STAT__TOTAL_DEATHS))
  table.addRow(createStatRow(TEXT__RECOVERED, STAT__RECOVERED))
  table.addRow(createStatRow(TEXT__CRITICAL, STAT__CRITICAL))

  return table
}

function createStatHeaderRow(name) {
  let headerRow = new UITableRow()

  headerRow.isHeader = true
  headerRow.addText(name)

  return headerRow
}

function createStatRow(name, value) {
  let row = new UITableRow()

  row.addText(name)
  row.addText(value.toString()).rightAligned()

  return row
}

function setWidgetTextStyle(text, type) {
  const FONT = type === "TITLE" ? FONT__TITLE_TEXT : type === "STAT" ? FONT__STAT_TEXT : FONT__NAME_TEXT

  text.fontName = FONT.FAMILY
  text.textColor = FONT.COLOR
  text.textOpacity = FONT.OPACITY
  text.textSize = FONT.SIZE
}

function createWidget() {
  const widget = new ListWidget()
  widget.useDefaultPadding()
  
let fm = FileManager.iCloud();
let path = fm.documentsDirectory() + "/IMAGE NAME HERE";
// Image.fromFile(path) can also be used
widget.backgroundImage = fm.readImage(path);



  // Widget Title
  const widgetTitle = widget.addText(config.widgetFamily === "small" ? TEXT__TITLE.smallWidget : TEXT__TITLE.default)
  setWidgetTextStyle(widgetTitle, "TITLE")
  widget.addSpacer(config.widgetFamily !== "large" ? 20 : 40)


  // Cases Today
  const casesTodayStat = widget.addText(STAT__CASES_TODAY)
  setWidgetTextStyle(casesTodayStat, 'STAT')
  widget.addSpacer(1.5)
  const casesTodayName = widget.addText(TEXT__CASES_TODAY)
  setWidgetTextStyle(casesTodayName, 'NAME')
  widget.addSpacer(config.widgetFamily !== "large" ? 12 : 16)


  if (config.widgetFamily === "large") {
    // Total Cases
    const totalCasesStat = widget.addText(STAT__TOTAL_CASES)
    setWidgetTextStyle(totalCasesStat, 'STAT')
    widget.addSpacer(1.5)
    const totalCasesName = widget.addText(TEXT__TOTAL_CASES)
    setWidgetTextStyle(totalCasesName, 'NAME')
    widget.addSpacer(config.widgetFamily !== "large" ? 12 : 16)


    // Critical
    const criticalStat = widget.addText(STAT__CRITICAL)
    setWidgetTextStyle(criticalStat, 'STAT')
    widget.addSpacer(1.5)
    const criticalName = widget.addText(TEXT__CRITICAL)
    setWidgetTextStyle(criticalName, 'NAME')
    widget.addSpacer(config.widgetFamily !== "medium" ? 12 : 16)
  }


  if (config.widgetFamily === "large") {
    // Recovered
    const recoveredStat = widget.addText(STAT__RECOVERED)
    setWidgetTextStyle(recoveredStat, 'STAT')
    widget.addSpacer(1.5)
    const recoveredName = widget.addText(TEXT__RECOVERED)
    setWidgetTextStyle(recoveredName, 'NAME')
    widget.addSpacer(config.widgetFamily !== "large" ? 12 : 16)
  }


  // Total Deaths
  const totalDeathsStat = widget.addText(STAT__TOTAL_DEATHS)
  setWidgetTextStyle(totalDeathsStat, 'STAT')
  widget.addSpacer(1.5)
  const totalDeathsName = widget.addText(TEXT__TOTAL_DEATHS)
  setWidgetTextStyle(totalDeathsName, 'NAME')


  return widget
}
