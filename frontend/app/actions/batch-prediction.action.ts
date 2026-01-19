"use server";

import { BatchPredictionResponse } from "@/src/modules/prediction/types/batch-prediction.types";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

export async function batchPredictionAction(
    formData: FormData
): Promise<{ success: boolean; data?: BatchPredictionResponse; error?: string }> {
    try {
        const file = formData.get("file") as File;

        if (!file) {
            return {
                success: false,
                error: "No file provided",
            };
        }

        // Validate file type
        if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
            return {
                success: false,
                error: "Invalid file type. Please upload a CSV file.",
            };
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return {
                success: false,
                error: "File size exceeds 5MB limit.",
            };
        }

        // Create FormData for backend request
        const backendFormData = new FormData();
        backendFormData.append("file", file);

        // Send request to backend
        const response = await fetch(`${BACKEND_URL}/predict/batch`, {
            method: "POST",
            body: backendFormData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return {
                success: false,
                error: `Server error: ${response.status} - ${errorText}`,
            };
        }

        const data: BatchPredictionResponse = await response.json();

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("Batch prediction error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}
