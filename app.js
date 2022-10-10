date = new Date();
id = (Date.now () + '').slice(-10);

class Workout {
    constructor(coords, distance, duration) {
        this.date = [... inputs];
        this.id = [... inputs];
        this.coords = coords; // [lat, lng]
        this.distance = distance; //in km
        this.duration = duration;// in min

    }

    setDescription() {
    // prettier ignore
        const months = ['January', 'February', 'March',  'April', 'May', 'June', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

    this.description = `#{this.type[0].toUpperCase()}${this.type.slice(1)} on ${
        months[this.date.getMonth()]}`;
    }
}

class Running extends Workout{
    type(running){ return(running)}
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence; 
        this.calcPace();
        this.setDescription();
    }    
    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace
    }
}

class Cycling  extends Workout {
    type = 'cycling';
        constructor(coords, distance, duration, elevationGain) {
            super(coords, distance, duration);
            this.elevationGain = elevationGain; 
            this.calcSpeed();
            this.setDescription();
    }

    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }

}

const run1 = new Running([39, -12], 5.2, 24, 178)
const run2 = new Cycling ([39, -12], 5.2, 24, 178)

// Application Architecture 

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('workouts');
const inputType = document.querySelector('.formInputType');
const inputDistance = document.querySelector('.formInputDistance');
const inputDuration = document.querySelector('.formInputDuration');
const inputCadence = document.querySelector('.formInputCadence');
const inputElevation = document.querySelector('.formInputElevation');


class App {
    #map;
    #mapEvent;
    this.workouts = [];
    constructor(); {
        
        this.getPosition();
        form.addEventListener('submit', this.newWorkout.bind(this))

        inputType.addEventListener('change', this.toggleElevationField);
    }

    getPosition();{// Using the Geolocation API 
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this.loadMap.bind(this),
                function() {
                alert('Could not get your position.');
                }
            );
        }

    loadMap(position);{
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude]

        // Displaying a Map Using Leaflet Library

        this.#map = L.map('map').setView(coords, 13);

        // L.map means a library form Leaflet 

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on('click', this.showForm.bind(this));
        
        //      const {lat, lng} = mapEvent.latlng;

        //      Displaying a Map Marker 

        //    L. marker creates to marker and addTo add it to the map
        //     L.marker([lat, lng]).addTo(map)

        //     bindPopup creates a Pop Up and bind it to the marker
        //     .bindPopup(L.popup({
        //         maxWidth: 250,
        //         minWidth: 100,
        //         autoClose: false,
        //         closeOnClick: false,
        //         className: 'running-popup',
        //     })
        //     )
        //     .setPopupContent('Workout')
        //     .openPopup();
    
    }

    showForm(mapE)
    {
        this.#map.on('click', function(mapE)
        this.#mapEvent = mapE;
        form.classList.remove('hidden')
        inputDistance.focus();
    }
    
    hideForm();{
    //empty inputs 
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = 
        '';
        form.getElementsByClassName.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.getElementsByClassName.display = 'grid'), 1000);
    }
    toggleElevationField();{
        inputElevation.closest('.formRow').classList.toggle('.formRowHidden');
        inputCadence.closest('.formRow').classList.toggle('.formRowHidden');
    }
}
    newWorkout(e);{
        const validInputs =(... inputs) => 
        inputs.every(inp => Number.isFinite(inp));

        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();
        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        //Check if data is valid

        // If the workout is running, create a running object 
        if(type === 'running') {
            // Check if the data is valid
            const cadence = +inputCadence.value;
            if(
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                !validInputs(distance, duration, cadence) 
                || !allPositive(distance, duration, cadence)
                ) 
                return alert('Inputs have to be positive numbers!')

                workout = new Running([lat, lng],distance, duration, cadence);

        }
         // If the workout is cycling, create a running object 
         if(type === 'cycling') {
            // Check if the data is valid
            const elevation = +inputElevation.value;
            if(!validInputs(distance, duration, elevation)
            || !allPositive(distance, duration)
            ) 
                return alert('Inputs have to be positive numbers!')
            
            workout = new Cycling([lat, lng],distance, duration, elevation);
            }
        // Add new object to workout array 
        this.workouts.push(workout);
        // Render workout on map as marker 
        this.renderWorkoutMarker(workout);
        
        // Displaying a Map Marker 
    
        //L. marker creates to marker and addTo add it to the map

        // Render workout on list
            this.renderWorkout(workout)
        // Hide form + Clear input fields 
        this.hideMap();

    }

    renderWorkoutMarker(workouts) {
        L.marker(workout.coords)
        .addTo(this.#map)
        bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            })
        )
            .setPopupContent(`${workout.type === 'running' ? '' : ''} ${workout.description}`)
            .openPopup();

    }
    renderWorkout(workout) {
        let html = `
                <div class="workout workout${workout.type}" data id="${workout.id}">
                <h2 class="workoutTitle">${workout.description}</h2>
                <div class="workoutDetails">
                    <span class="workoutIcon">${
                        workout.name === 'running' ? '' : '' }
                    </span>
                    <span class="workoutValue">${workout.distance}</span>
                    <span class="workoutUnit">min.</span>
                </div>
                <div class="workoutDetails">
                    <span class="workoutIcon"></span>
                    <span class="workoutValue">${workout.duration}</span>
                    <span class="workoutUnit">min.</span>
                </div>
        `;
        
        if(workout.type === 'running')
            html += `
                <div class="workoutDetails">
                    <span class="workoutIcon"></span>
                    <span class="workoutValue">${workout.pace.toFixed(1)}</span>
                    <span class="workoutUnit">min.</span>
                </div>
                <div class="workoutDetails">
                    <span class="workoutIcon"></span>
                    <span class="workoutValue">${workout.cadence}</span>
                    <span class="workoutUnit">min.</span>
                </div>
            `;

            if(workout.type === 'cycling')
            html += `
                <div class="workoutDetails">
                    <span class="workoutIcon"></span>
                    <span class="workoutValue">${workout.speed.toFixed(1)}</span>
                    <span class="workoutUnit">min.</span>
                </div>
                <div class="workoutDetails">
                    <span class="workoutIcon"></span>
                    <span class="workoutValue">${workout.elevationGain}</span>
                    <span class="workoutUnit">min.</span>
                </div>
            `;

            form.insertAdjacentHTML('afterend', html);
    }
}


const app = new App();



// // Using the Geolocation API 
// if (navigator.geolocation)
//     navigator.geolocation.getCurrentPosition(
//         function(position) {
//             const {latitude} = position.coords;
//             const {longitude} = position.coords;
//             console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//             const coords = [latitude, longitude]

//             // Displaying a Map Using Leaflet Library

//             const map = L.map('map').setView(coords, 13);

//             // L.map means a library form Leaflet 

//             L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: 
//                 '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             }).addTo(map);
            
//             map.on('click', function(mapE){
//                 mapEvent = mapE;
//                 console.log(mapEvent); 
                
//                 form.classList.remove('hidden')
//                 inputDistance.focus();
//             //     const {lat, lng} = mapEvent.latlng;

//             //     // Displaying a Map Marker 

//             //     //L. marker creates to marker and addTo add it to the map
//             //     L.marker([lat, lng]).addTo(map)

//             //     //bindPopup creates a Pop Up and bind it to the marker
//             //     .bindPopup(L.popup({
//             //         maxWidth: 250,
//             //         minWidth: 100,
//             //         autoClose: false,
//             //         closeOnClick: false,
//             //         className: 'running-popup',
//             //     })
//             //     )
//             //     .setPopupContent('Workout')
//             //     .openPopup();
//             // })
//         }, 
//         function() {
//         alert('Could not get your position.');
//         }
//     );


// // Rendering a Workout Input Form

// form.addEventListener('submit', function(e){
//     e.preventDefault();

//     //Clear input fields
//     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = 
//     '';

//     console.log(mapEvent); 
//     const {lat, lng} = mapEvent.latlng;

//     // Displaying a Map Marker 

//     //L. marker creates to marker and addTo add it to the map
//     L.marker([lat, lng])
//     .addTo(map)

//     //bindPopup creates a Pop Up and bind it to the marker
//     bindPopup(
//         L.popup({
//             maxWidth: 250,
//             minWidth: 100,
//             autoClose: false,
//             closeOnClick: false,
//             className: 'running-popup',
//         })
//     )
//         .setPopupContent('Workout')
//                 .openPopup();
//             })
// });

// inputType.addEventListener('change', function() {
//     inputElevation.closest('.formRow').classList.toggle('.formRowHidden')
//     inputcadence.closest('.formRow').classList.toggle('.formRowHidden')
// });