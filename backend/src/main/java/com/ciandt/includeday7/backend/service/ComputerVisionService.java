package com.ciandt.includeday7.backend.service;

import com.ciandt.includeday7.backend.model.ComputerVisionInput;
import com.ciandt.includeday7.backend.model.ComputerVisionOut;
import com.ciandt.includeday7.backend.utils.LoggerHelper;
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
import java.util.logging.Logger;

public class ComputerVisionService {
    private static final Logger log = Logger.getLogger(ComputerVisionService.class.getName());
    public static final String subscriptionKey = "b1f2c51a9087420380f294b683742071";
    public static final String uriBase = "https://westus.api.cognitive.microsoft.com/vision/v1.0/describe";

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
            //builder.setParameter("visualFeatures", "Categories,Description,Color");
            //builder.setParameter("language", "en");
            builder.setParameter("maxCandidates", "1");

            // Prepare the URI for the REST API call.
            URI uri = builder.build();
            HttpPost request = new HttpPost(uri);

            // Request headers.
            request.setHeader("Content-Type", "application/octet-stream");
            request.setHeader("Ocp-Apim-Subscription-Key", subscriptionKey);

            byte[] image = Base64.decodeBase64(newBase64.getBytes());
            request.setEntity(new ByteArrayEntity(image));

            //LoggerHelper.getInstance(log).log("Request Vision: ", request);
            //LoggerHelper.getInstance(log).log("HTTPClient Vision: ", httpclient);

            // Execute the REST API call and get the response entity.
            HttpResponse response = httpclient.execute(request);
            HttpEntity entity = response.getEntity();

            LoggerHelper.getInstance(log).log("Response Vision: ", response);
            LoggerHelper.getInstance(log).log("Entity Vision: ", entity);

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
            LoggerHelper.getInstance(log).log("Error Vision: ", e);
            throw new ConflictException("Erro ao processar o request no Computer Vision: " + e.getMessage());
        }

        return retorno;
    }
}
