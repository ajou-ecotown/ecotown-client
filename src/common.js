async function fetchPost(url, body, setter) {
    try {
        const response = await fetch('http://localhost:8080' + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (setter) setter(data);

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있게 함
    }
}

function fetchGet(url, setter) {
    fetch('http://localhost:8080'  + url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (setter) setter(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export {
    fetchPost,
    fetchGet
};