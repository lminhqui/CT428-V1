document.getElementById('btn-fillter').addEventListener('click', () => {
    const filter_form = document.getElementById('filter-form')
    let search_cateogry
    let search_provider
    for (let index = 0; index < filter_form.search_cateogry.length; index++) {
        const element = filter_form.search_cateogry[index]
        if (element.checked) search_cateogry = element.value
    }
    for (let index = 0; index < filter_form.search_provider.length; index++) {
        const element = filter_form.search_provider[index]
        if (element.checked) search_provider = element.value
    }
    console.log(search_cateogry)
    console.log(search_provider)
    window.location.replace(
        `/product?category=${search_cateogry}&provider=${search_provider}`
    )
})
