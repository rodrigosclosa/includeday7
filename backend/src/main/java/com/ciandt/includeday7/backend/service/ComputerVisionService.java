package com.ciandt.includeday7.backend.service;

import com.ciandt.includeday7.backend.model.ComputerVisionInput;
import com.ciandt.includeday7.backend.model.ComputerVisionOut;
import com.google.api.server.spi.response.ConflictException;
import endpoints.repackaged.com.google.gson.Gson;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.net.URI;

public class ComputerVisionService {
    public static final String subscriptionKey = "911dad9c187d48509e1763b87aa29698";
    public static final String uriBase = "https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0/analyze";

    public ComputerVisionService() {
    }

    public ComputerVisionOut analyze(ComputerVisionInput computerVisionInput) throws ConflictException {
        ComputerVisionOut retorno = new ComputerVisionOut();
        HttpClient httpclient = new DefaultHttpClient();

        try
        {
            String newBase64 = computerVisionInput.getBase64Image().replace("data:image/jpeg;base64,", "");
            URIBuilder builder = new URIBuilder(uriBase);

            // Request parameters. All of them are optional.
            builder.setParameter("visualFeatures", "Categories,Description,Color");
            builder.setParameter("language", "en");

            // Prepare the URI for the REST API call.
            URI uri = builder.build();
            HttpPost request = new HttpPost(uri);

            // Request headers.
            request.setHeader("Content-Type", "application/octet-stream");
            request.setHeader("Ocp-Apim-Subscription-Key", subscriptionKey);

            byte[] image = Base64.decodeBase64(newBase64.getBytes());
            request.setEntity(new ByteArrayEntity(image));

            // Execute the REST API call and get the response entity.
            HttpResponse response = httpclient.execute(request);
            HttpEntity entity = response.getEntity();

            if (entity != null) {
                // Format and display the JSON response.
                //Gson gson = new Gson();
                String jsonString = EntityUtils.toString(entity);
                //JSONObject json = new JSONObject(jsonString);

                retorno = new Gson().fromJson(jsonString, ComputerVisionOut.class);
            }
        }
        catch (Exception e)
        {
            throw new ConflictException("Erro ao processar o request no Computer Vision: " + e.getMessage());
        }

        return retorno;
    }
}
