export async function createNewUser(fname, lname, email, password) {
	return fetch(`/api/users`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ fname, lname, email, password })
	}).then(res => res.json());
}

export async function signinUser(email, password) {
	return fetch(`/api/usersignin`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	}).then(res => res.json());
}

export async function authenticateUser() {
	return fetch(`/api/authuser/`, {
		method: 'GET',
		headers: {
			'Referrer-Policy': 'no-referrer',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('JWT')}`
		}
	})
		.then(res => res.json())
		.catch(error => console.log(error));
}

export async function createFoodRecord(userId, foodData, trackDate) {
	return fetch(`/api/users/${userId}/food`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Referrer-Policy': 'no-referrer',
			Authorization: `Bearer ${localStorage.getItem('JWT')}`
		},
		body: JSON.stringify({ foodData, trackDate })
	})
		.then(res => res.json())
		.catch(error => console.log(error));
}

export async function updateFoodRecord(userId, foodRecordID, foodData) {
	return fetch(`/api/users/${userId}/food/${foodRecordID}`, {
		method: 'PATCH',
		headers: {
			'Referrer-Policy': 'no-referrer',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('JWT')}`
		},
		body: JSON.stringify({ foodData })
	})
		.then(res => res.json())
		.catch(error => console.log(error));
}

export async function addActivity(userId, activityData) {
	return fetch(`/api/users/${userId}/activity`, {
		method: 'POST',
		headers: {
			'Referrer-Policy': 'no-referrer',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('JWT')}`
		},
		body: JSON.stringify({ activityData })
	})
		.then(res => res.json())
		.catch(error => console.log(error));
}

export async function removeActivity(userId, activityId) {
	return fetch(`/api/users/${userId}/activity/${activityId}`, {
		method: 'DELETE',
		headers: {
			'Referrer-Policy': 'no-referrer',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('JWT')}`
		}
	})
		.then(res => res.json())
		.catch(error => console.log(error));
}
