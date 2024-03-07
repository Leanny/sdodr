export function generateHeader(elem) {
    elem.append(`
<ul class="navbar-nav mr-auto">
    <li class="nav-item">
    <a class="nav-link" href="shop.html">Cipher Shop Database</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="enemy.html">Enemy Database</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="floor.html">Floor Database</a>
    </li> 
    <li class="nav-item">
    <a class="nav-link" href="hacking.html">Hacking Database</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="marinadev.html">Marina's Dev Diary Database</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="index.html">Pallette Database</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="tone.html">Tone Database</a>
    </li>
</ul>`)
}

export function generateFooter(elem) {
    elem.append(`<div class="container text-muted">
    <div class="footer-notice">
        <p>Webpage created by Lean. Framework used is <a href="https://getbootstrap.com/">Bootstrap</a>. <a href="https://github.com/OatmealDome/OatmealDome.NinLib.MessageStudio">Message Lib</a> by <a href="https://twitter.com/OatmealDome">OatmealDome<span class="fa fa-twitter"></span></a>. Salmon Run RNG Data in cooperation with <a href="https://twitter.com/WemI0">WemI0<span class="fa fa-twitter"></span></a></p>
        <p>
            Feedback or suggestions are welcome. Please contact me via Twitter
            <a href="https://twitter.com/LeanYoshi"><span class="fa fa-twitter"></span></a> or Github <a href="https://github.com/leanny/leanny.github.io"><span class="fa fa-github"></span></a>.
        </p>
    </div>
</div>`)
}

export function get_prefix() {
    if (window.location.href.includes("leanny.github.io")) {
        return "https://leanny.github.io/sdodr/"
    } else {
        return "http://127.0.0.1:50815/"
    }
}

export function localize(dir, key) {
    return lang_dict[dir][key]
}

export function get_image_tag(img, alt, extra = "") {
    return `<picture>
        <source type="image/png" srcset="${img}" ${extra}>
        <img src="${img}" alt="${alt}" ${extra}>
    </picture>`
}

export function format_img(base_url, value, width) {
    return get_image_tag(`${base_url}${value}.png`, "", `width="${width}"`)
}

export function add_tab(tab_name, tab_label) {
    const first = $("#modes").children().length == 0
    $("#modes").append(`
    <li class="nav-item">
    <a
        class="nav-link${first ? " active" : ""}"
        id="${tab_name}-tab"
        data-toggle="tab"
        href="#${tab_name}"
        role="tab"
        aria-controls="${tab_name}"
        aria-selected="true"
        >${tab_label}</a
    >
</li>`)
    $("#modeTabControl").append(`
    <div class="tab-pane fade show${
        first ? " active" : ""
    }" id="${tab_name}" role="tabpanel" aria-labelledby="${tab_name}-tab"></div>    
    `)
}

export function add_table(tab_name, tabale_name, table_configuration, header_name) {
    const header = header_name !== undefined ? `<h2>${header_name}</h2>` : ""
    let ths = ""
    table_configuration.forEach(entry => {
        const fields = []
        for (const [elem_key, elem_value] of Object.entries(entry)) {
            if (elem_key !== "Label") {
                fields.push(`data-${elem_key}="${elem_value}"`)
            }
        }
        ths += `<th scope="col" ${fields.join(" ")}>
            ${entry.Label}
        </th>`
    })
    $(`#${tab_name}`).append(`${header}
    <div class="table-responsive">
        <table
            class="table table-striped table-hover"
            id="${tabale_name}"
            data-sortable="true"
            data-search="true"
            data-show-columns="true"
            data-show-pagination-switch="true"
            data-page-size="10"
            data-show-fullscreen="true"
        >
            <thead>
                <tr>
                    ${ths}
                </tr>
            </thead>
        </table>
    </div>
</div>`)
    $(`#${tabale_name}`).bootstrapTable({})
    //$(`#${tab_name}`).append(table_configuration)
}

export function evaluate_string(value) {
    if (value === undefined) return value
    return value.replace(/\[group.*\]/, "").replaceAll(/\[ruby="(.*?)"\](.*?)\[\/ruby\]/g, "<ruby>$2<rt>$1</ruby>")
}

export function byname_adjective_formatter(value) {
    const name = value.replace("Work/Gyml/Byname/", "").replace(".spl__BynameAdjectiveInfo.gyml", "")
    return evaluate_string(localize("CommonMsg/Byname/BynameAdjective", name))
}

export function byname_subject_formatter(value) {
    const name = value.replace("Work/Gyml/Byname/", "").replace(".spl__BynameSubjectInfo.gyml", "")

    const s1 = evaluate_string(localize("CommonMsg/Byname/BynameSubject", name + "_0"))
    let s2 = localize("CommonMsg/Byname/BynameSubject", name + "_1")
    if (s2 !== undefined) {
        s2 = evaluate_string(s2)
    }
    return `${s1}${s2 === undefined || s2.length === 0 ? "" : " | " + s2}`
}
