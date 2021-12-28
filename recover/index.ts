function recover() {
    const rawUrl: string = document.URL;
    const url: URL = new URL(rawUrl);
    const data: string | null = url.searchParams.get('data');

    if (data != null) {
        const parsedData: obj = JSON.parse(atob(data));
        Datahandler.saveData('missions', parsedData.missions);
        Datahandler.saveData('vehicles', parsedData.vehicles);
    }

    location.assign('../');
}
