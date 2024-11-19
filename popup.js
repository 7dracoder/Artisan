$(document).ready(function () {
    const apiKey = "your-api-key"; // Replace with the actual API key.
    const writeAPI = "https://api.example.com/write";
    const rewriteAPI = "https://api.example.com/rewrite";
    const translateAPI = "https://api.example.com/translate";
    const summarizeAPI = "https://api.example.com/summarize";

    // Handle caption generation
    $("#generate").click(function () {
        const theme = $("#theme").val();

        if (!theme.trim()) {
            alert("Please enter a theme or topic.");
            return;
        }

        $.ajax({
            url: writeAPI,
            type: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({ theme }),
            success: function (response) {
                $("#caption-output").text(response.caption);
                $("#output").show();
            },
            error: function () {
                alert("Failed to generate caption. Please try again later.");
            }
        });
    });

    // Handle caption rewriting
    $("#rewrite").click(function () {
        const caption = $("#caption-output").text();

        if (!caption.trim()) {
            alert("Please generate or write a caption first.");
            return;
        }

        $.ajax({
            url: rewriteAPI,
            type: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({ caption }),
            success: function (response) {
                $("#caption-output").text(response.rewrittenCaption);
            },
            error: function () {
                alert("Failed to rewrite caption. Please try again later.");
            }
        });
    });

    // Handle translation
    $("#translate").click(function () {
        const caption = $("#caption-output").text();
        const language = $("#language").val();

        if (!caption.trim()) {
            alert("Please generate or write a caption first.");
            return;
        }

        $.ajax({
            url: translateAPI,
            type: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({ caption, language }),
            success: function (response) {
                $("#caption-output").text(response.translatedCaption);
            },
            error: function () {
                alert("Failed to translate caption. Please try again later.");
            }
        });
    });

    // Handle summarization
    $("#summarize").click(function () {
        const longText = $("#user-caption").val();

        if (!longText.trim()) {
            alert("Please enter a long text to summarize.");
            return;
        }

        $.ajax({
            url: summarizeAPI,
            type: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({ text: longText }),
            success: function (response) {
                $("#caption-output").text(response.summary);
            },
            error: function () {
                alert("Failed to summarize text. Please try again later.");
            }
        });
    });

    // Handle canvas setup
    $("#design").click(function () {
        $("#canvas-container").show();
        const canvas = document.getElementById("designCanvas");
        const context = canvas.getContext("2d");
        const template = $("#template").val();

        // Set canvas dimensions based on template
        if (template === "square") {
            canvas.width = 1080;
            canvas.height = 1080;
        } else if (template === "banner") {
            canvas.width = 1080;
            canvas.height = 450;
        } else if (template === "portrait") {
            canvas.width = 1080;
            canvas.height = 1350;
        }

        context.fillStyle = "#f4f4f4";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "24px Arial";
        context.fillStyle = "#000";
        context.fillText($("#caption-output").text(), 20, 50);
    });

    // Download canvas as an image
    $("#download").click(function () {
        const canvas = document.getElementById("designCanvas");
        const link = document.createElement("a");
        link.download = "design.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});
